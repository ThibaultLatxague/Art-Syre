export class Image {
    id: number;
    url: string;
    texteAlternatif: string;
    tableauId: number;

    constructor(id: number, url: string, texteAlternatif: string, tableauId: number) {
        this.id = id;
        this.url = url;
        this.texteAlternatif = texteAlternatif;
        this.tableauId = tableauId;
    }
}