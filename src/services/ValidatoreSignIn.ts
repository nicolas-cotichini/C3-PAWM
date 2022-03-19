class Validatore {
  validateEmail(email: string) {
    if (email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailTest = re.test(String(email).toLowerCase());
      if (emailTest !== true) {
        return false;
      } else {
        return true;
      }
    } else return false;
  }

  validatePassword(password: string, confermaPass: string) {
    let forzaPassword = 0;

    //calcolo lunghezza minima/massima della password
    if (password.length > 12 || password.length < 8) return forzaPassword;
    forzaPassword++;

    //controllo password di conferma
    if (password !== confermaPass) return forzaPassword;
    forzaPassword++;

    //minuscole
    forzaPassword = /.*[a-z].*/.test(password)
      ? ++forzaPassword
      : forzaPassword;

    //maiuscole
    forzaPassword = /.*[A-Z].*/.test(password)
      ? ++forzaPassword
      : forzaPassword;

    //numero
    forzaPassword = /.*[0-9].*/.test(password)
      ? ++forzaPassword
      : forzaPassword;

    //carattere speciale
    forzaPassword = /[^a-zA-Z0-9]/.test(password)
      ? ++forzaPassword
      : forzaPassword;

    return forzaPassword;
  }
}

export default new Validatore();
