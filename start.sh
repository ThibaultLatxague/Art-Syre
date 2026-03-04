#!/usr/bin/env bash
# =============================================================================
#  ArtSyre — Script de démarrage (Linux / macOS)
#  Usage : ./start.sh
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACK_DIR="$SCRIPT_DIR/ArtSyreBack"
FRONT_DIR="$SCRIPT_DIR/ArtSyreFront"

BACKEND_PORT=8000
FRONTEND_PORT=4200
MYSQL_PORT=3306

# ── Couleurs ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo ""
echo -e "${CYAN}${BOLD}🎨  ArtSyre — Démarrage des services${NC}"
echo -e "${CYAN}══════════════════════════════════════${NC}"
echo ""

# ── 1. Arrêt des processus existants ─────────────────────────────────────────
echo -e "${YELLOW}⏹  Arrêt des processus existants...${NC}"

for PORT in $BACKEND_PORT $FRONTEND_PORT; do
    PIDS=$(lsof -ti tcp:$PORT 2>/dev/null || true)
    if [ -n "$PIDS" ]; then
        echo -e "   Arrêt du processus sur le port ${PORT}..."
        kill -9 $PIDS 2>/dev/null || true
    fi
done

pkill -f "artisan serve" 2>/dev/null || true
pkill -f "ng serve"      2>/dev/null || true

sleep 1
echo -e "${GREEN}   ✔ Processus arrêtés${NC}"
echo ""

# ── 2. Démarrage de LAMP (Apache + MySQL) ────────────────────────────────────
echo -e "${CYAN}🗄️  Démarrage de LAMP (Apache + MySQL)...${NC}"

# Détection du gestionnaire de services disponible
start_lamp_service() {
    local SERVICE=$1
    local LABEL=$2

    if command -v systemctl &>/dev/null; then
        # Vérifie si déjà actif
        if systemctl is-active --quiet "$SERVICE" 2>/dev/null; then
            echo -e "${GREEN}   ✔ $LABEL déjà actif${NC}"
        else
            echo "   Démarrage de $LABEL..."
            sudo systemctl start "$SERVICE" 2>/dev/null && \
                echo -e "${GREEN}   ✔ $LABEL démarré${NC}" || \
                echo -e "${YELLOW}   ⚠ Impossible de démarrer $LABEL (sudo requis ?)${NC}"
        fi
    elif command -v service &>/dev/null; then
        sudo service "$SERVICE" start 2>/dev/null && \
            echo -e "${GREEN}   ✔ $LABEL démarré${NC}" || \
            echo -e "${YELLOW}   ⚠ Impossible de démarrer $LABEL${NC}"
    else
        echo -e "${YELLOW}   ⚠ Gestionnaire de services introuvable — démarrez $LABEL manuellement${NC}"
    fi
}

# Apache2 (nom du service selon les distros)
for APACHE_SVC in apache2 httpd; do
    if systemctl list-units --type=service 2>/dev/null | grep -q "${APACHE_SVC}.service"; then
        start_lamp_service "$APACHE_SVC" "Apache"
        break
    fi
done

# MySQL (ou MariaDB selon les distros)
for MYSQL_SVC in mysql mysqld mariadb; do
    if systemctl list-units --type=service 2>/dev/null | grep -q "${MYSQL_SVC}.service"; then
        start_lamp_service "$MYSQL_SVC" "MySQL/MariaDB"
        break
    fi
done

# Attendre que MySQL soit disponible sur le port 3306
echo "   Attente de MySQL sur le port ${MYSQL_PORT}..."
MYSQL_WAIT=0
while ! nc -z localhost $MYSQL_PORT 2>/dev/null; do
    sleep 1
    MYSQL_WAIT=$((MYSQL_WAIT + 1))
    if [ $MYSQL_WAIT -ge 30 ]; then
        echo -e "${YELLOW}   ⚠ MySQL non disponible après 30s — vérifiez LAMP${NC}"
        break
    fi
done
if nc -z localhost $MYSQL_PORT 2>/dev/null; then
    echo -e "${GREEN}   ✔ MySQL prêt sur le port ${MYSQL_PORT}${NC}"
fi
echo ""

# ── 3. Vérification des dossiers ─────────────────────────────────────────────
for DIR in "$BACK_DIR" "$FRONT_DIR"; do
    if [ ! -d "$DIR" ]; then
        echo -e "${RED}❌  Dossier introuvable : $DIR${NC}"
        echo "    Vérifiez que le script est lancé depuis la racine du projet."
        exit 1
    fi
done

# ── 4. Backend Laravel ────────────────────────────────────────────────────────
echo -e "${CYAN}🔧  Démarrage du backend Laravel (port ${BACKEND_PORT})...${NC}"
cd "$BACK_DIR"

if [ ! -d "vendor" ]; then
    echo "   Installation des dépendances PHP (composer install)..."
    composer install --no-interaction --quiet
fi

if [ ! -f ".env" ]; then
    echo "   Création du fichier .env..."
    cp .env.example .env
    php artisan key:generate --quiet
fi

echo "   Exécution des migrations..."
php artisan migrate --force --quiet 2>/dev/null || true

php artisan serve --port=$BACKEND_PORT > /tmp/artsyre-back.log 2>&1 &
BACK_PID=$!
echo -e "${GREEN}   ✔ Backend démarré (PID $BACK_PID) → http://localhost:${BACKEND_PORT}${NC}"
echo ""

# ── 5. Frontend Angular ───────────────────────────────────────────────────────
echo -e "${CYAN}🌐  Démarrage du frontend Angular (port ${FRONTEND_PORT})...${NC}"
cd "$FRONT_DIR"

if [ ! -d "node_modules" ]; then
    echo "   Installation des dépendances Node (npm install)..."
    npm install --silent
fi

npx ng serve --port=$FRONTEND_PORT > /tmp/artsyre-front.log 2>&1 &
FRONT_PID=$!
echo -e "${GREEN}   ✔ Frontend démarré (PID $FRONT_PID) → http://localhost:${FRONTEND_PORT}${NC}"
echo ""

# ── 6. Attente que les services soient prêts ──────────────────────────────────
echo -e "${YELLOW}⏳  Attente de la disponibilité des services...${NC}"

wait_for_port() {
    local PORT=$1
    local MAX=90
    local COUNT=0
    while ! nc -z localhost $PORT 2>/dev/null; do
        sleep 1
        COUNT=$((COUNT + 1))
        if [ $COUNT -ge $MAX ]; then
            echo -e "${RED}   ⚠ Timeout : le port $PORT n'est pas disponible après ${MAX}s${NC}"
            return 1
        fi
    done
}

wait_for_port $BACKEND_PORT  && echo -e "${GREEN}   ✔ Backend  prêt${NC}"
wait_for_port $FRONTEND_PORT && echo -e "${GREEN}   ✔ Frontend prêt${NC}"
echo ""

# ── 7. Ouverture du navigateur ────────────────────────────────────────────────
echo -e "${CYAN}🌍  Ouverture des pages dans le navigateur...${NC}"

open_browser() {
    local URL=$1
    if command -v xdg-open &>/dev/null; then
        xdg-open "$URL" &>/dev/null &
    elif command -v open &>/dev/null; then
        open "$URL"
    else
        echo "   (Impossible d'ouvrir le navigateur automatiquement — ouvrez $URL manuellement)"
    fi
}

open_browser "http://localhost:${FRONTEND_PORT}"
sleep 0.5
open_browser "http://localhost:${BACKEND_PORT}"

# ── 8. Récapitulatif ──────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}══════════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}✅  ArtSyre est opérationnel !${NC}"
echo -e "${CYAN}══════════════════════════════════════${NC}"
echo ""
echo -e "  🌐 Application  → ${BOLD}http://localhost:${FRONTEND_PORT}${NC}"
echo -e "  🔧 API Backend  → ${BOLD}http://localhost:${BACKEND_PORT}${NC}"
echo ""
echo -e "  🗄️ Base de données → ${BOLD}MySQL sur le port ${MYSQL_PORT}${NC}"
echo ""
echo -e "  Logs backend  : ${YELLOW}tail -f /tmp/artsyre-back.log${NC}"
echo -e "  Logs frontend : ${YELLOW}tail -f /tmp/artsyre-front.log${NC}"
echo ""
echo -e "  Appuyez sur ${RED}Ctrl+C${NC} pour arrêter tous les services."
echo ""

# ── 9. Nettoyage à la fermeture ───────────────────────────────────────────────
cleanup() {
    echo ""
    echo -e "${YELLOW}⏹  Arrêt des services...${NC}"
    kill $BACK_PID  2>/dev/null || true
    kill $FRONT_PID 2>/dev/null || true
    pkill -f "artisan serve" 2>/dev/null || true
    pkill -f "ng serve"      2>/dev/null || true
    echo -e "${GREEN}✔ Services arrêtés. À bientôt !${NC}"
    echo -e "${YELLOW}   ℹ️  LAMP (Apache/MySQL) reste actif en arrière-plan.${NC}"
    echo -e "   Pour l'arrêter : ${YELLOW}sudo systemctl stop apache2 mysql${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

wait $BACK_PID $FRONT_PID