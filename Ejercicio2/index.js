const TEMAS = ['Cocina', 'Futbol', 'Salud', 'Arte', 'Sucesos', 'Política', 'Economía', 'Música', 'Cine', 'Baloncesto', 'Javascript', 'Vinos', 'Papiroflexia'];

const errorName = document.querySelector('.errorName');
const errorDni = document.querySelector('.errorDNI');
const errorSub = document.querySelector('.errorSubs');
const errorThemes = document.querySelector('.errorThemes');

const requiredThemes = {
  'basico': 1,
  'estandar': 3,
  'premium': 6,
  'elite': TEMAS.length
};



function loadThemes() {
  const themeList = document.querySelector('.themes');
  TEMAS.forEach(t => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    checkbox.setAttribute('type', 'checkbox')
    checkbox.name = 'tema[]';
    checkbox.id = "t" + t;
    checkbox.value = "t" + t;
    label.setAttribute('for', "t" + t);
    label.innerHTML = t;
    themeList.append(checkbox);
    themeList.append(label);
  });
}

function validateUser(e) {
  const name = document.getElementById('nombre').value.toUpperCase();
  const dni = document.getElementById('dni').value.toUpperCase();
  const sub = document.getElementsByName('tipo');
  const themes = document.getElementsByName('tema[]');
  validateName(name, e);
  validateDNI(dni, e);
  themesValidate(sub, themes, e);
}

function validateName(username, e) {
  if (username.length < 3) {
    errorName.innerHTML = 'Minimo 3 caracteres';
    e.preventDefault();
  } else {
    errorName.innerHTML = ''
  }
}

function validateDNI(DNI, e) {
  if (!/^\d{8}-[A-Z]$/.test(DNI)) {
    errorDni.innerHTML = "Introzuca un número válido de DNI";
    e.preventDefault();
  } else {
    errorDni.innerHTML = "";
  }
}

function themesValidate(sub, themes, e) {
  if (themesCheked(themes) !== numThemes(sub)) {
    errorThemes.innerHTML = `Debe marcar mínimo ${numThemes(sub)} tema`;
    if (numThemes(sub) > 1) errorThemes.innerHTML += "s";
    e.preventDefault();
  } else errorThemes.innerHTML = '';
}

function themesCheked(themes) {
  let cant = 0;
  themes.forEach(t => {
    if (t.checked) cant++;
  });
  return cant;
}

function numThemes(subs) {
  let themesNum = 0;
  subs.forEach(sub => {
    if (sub.checked) themesNum = requiredThemes[sub.value];
  });
  return themesNum;
}


loadThemes()
const submit = document.getElementById('send');
submit.addEventListener('click', validateUser)