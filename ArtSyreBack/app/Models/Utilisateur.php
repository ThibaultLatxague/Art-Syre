<!-- 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'dateCreation',
        'estAdministrateur'
        // Ajoutez vos autres champs ici
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed', // Laravel 10+
        ];
    }

    /**
     * Si votre table n'est pas nommée "users"
     */
    protected $table = 'utilisateurs'; // Remplacez par le nom de votre table

    /**
     * Si votre clé primaire n'est pas "id"
     */
    // protected $primaryKey = 'user_id';

    /**
     * Si vous n'utilisez pas les timestamps created_at/updated_at
     */
    // public $timestamps = false;

    public function commandes()
    {
        return $this->belongsToMany(Tableau::class, 'tableau_utilisateur_commande');
    }

    public function souhaits()
    {
        return $this->belongsToMany(Tableau::class, 'tableau_utilisateur_souhaite');
    }
} -->
