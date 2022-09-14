class User {
  // nom = "";
  // prenom = "";
  constructor(prenom, nom) {
    this._nom = nom;
    this._prenom = prenom;
  }

  get nom() {
    return this._nom;
  }

  set nom(value) {
    this._nom = value;
  }
  recupNom() {
    return this._nom;
  }
}

const user = new User("Toto", "Tata");
console.log(user.nom);

user.nom = "Titi";

console.log(user.nom);
