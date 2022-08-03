var items = document.querySelectorAll(".item");
console.log(items)
items.forEach(item => {

 console.log("item",item)
 item.addEventListener("dragstart", () => {
  console.log("dragstart triggered....")
  item.classList.add('dragging')
 })

 item.addEventListener("dragend", () => {
  console.log("dragend triggerd....")
  item.classList.remove('dragging')
 })
});

const container=document.getElementById("container")

 container.addEventListener('dragover', (e) => {
   e.preventDefault()
   const afterElement = getDragAfterElement(container, e.clientY)
   const draggable = document.querySelector('.dragging')
   if (afterElement == null) {
     container.appendChild(draggable)
   } else {
     container.insertBefore(draggable, afterElement)
   }
 })



function getDragAfterElement(container, y) {
 const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')]

 return draggableElements.reduce((closest, child) => {
   const box = child.getBoundingClientRect()
   const offset = y - box.top - box.height / 2
   if (offset < 0 && offset > closest.offset) {
     return { offset: offset, element: child }
   } else {
     return closest
   }
 }, { offset: Number.NEGATIVE_INFINITY }).element
}