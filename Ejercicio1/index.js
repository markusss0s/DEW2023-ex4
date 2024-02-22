const tasks = [
  "Hacer la cama",
  "Lavar los platos",
  "Sacar la basura",
  "Pasear al perro",
  "Hacer la compra",
  "Limpiar el baño",
  "Cocinar la cena",
  "Lavar la ropa",
  "Regar las plantas",
  "Estudiar JavaScript"
];

const workflow = {
  panel1: ['panel2', 'panel3'],
  panel2: ['panel1', 'panel3', 'panel4', 'panel5'],
  panel3: ['panel1', 'panel2', 'panel5', 'panel6'],
  panel4: ['panel2', 'panel5', 'panel7', 'panel8'],
  panel5: ['panel2', 'panel3', 'panel4', 'panel6', 'panel8', 'panel9'],
  panel6: ['panel3', 'panel5', 'panel9', 'panel10'],
  panel7: ['panel4', 'panel8'],
  panel8: ['panel4', 'panel5', 'panel7', 'panel9'],
  panel9: ['panel5', 'panel6', 'panel8', 'panel10'],
  panel10: ['panel6', 'panel9'],
}

let panels = [];
let indexId = 0;

function createTask(task) {
  const newTask = document.createElement('span');
  newTask.id = "t" + indexId;
  newTask.innerHTML = task;
  newTask.className = 'task';
  newTask.setAttribute('draggable', true);
  newTask.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.id);
    let panel = e.target.parentNode.id;
    panels = workflow[panel];
  })
  indexId++;
  return newTask;
}

function loadFlow() {
  const panel = document.getElementById('panel1');
  tasks.forEach(t => {
    panel.appendChild(createTask(t));
  });
}

function loadEventsPanels() {
  const allPanels = [...document.querySelectorAll('.panel')];
  allPanels.forEach(p => {
    p.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    p.addEventListener('drop', (e) => {
      const id = e.dataTransfer.getData('text/plain');
      const draggableTask = document.getElementById(id);
      const dropPanel = e.target;
      if (panels.includes(dropPanel.id)) {
        dropPanel.appendChild(draggableTask);
        e.dataTransfer.clearData();
      }
    });
  });
}

loadFlow();
loadEventsPanels();
