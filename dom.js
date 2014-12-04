/*
The Document Object Model (DOM) is a programming interface for HTML, XML and 
SVG documents.

It provides a structured representation of the document (a tree) and it defines 
a way that the structure can be accessed from programs so that they can change 
the document structure, style and content.

The DOM provides a representation of the document as a structured group of 
nodes and objects that have properties and methods.

Nodes can also have event handlers attached to them, and once that event is 
triggered the event handlers get executed.

Essentially, it connects web pages to scripts or programming languages
*/


/* Document properties*/
document.onreadystatechange = function(){

  console.log(document.readyState);

  switch (document.readyState) {
    case 'complete': 
      createPage();
      break;
  }

};

document.bgColor = '#001122'
document.cookie = ''
document.title = 'DOM Sandbox Page';

function createPage () {

  /* Document methods */
  var innerDIV = document.createElement('div');

  /* Find an element by ID - return HTMLElement */
  var container = document.getElementById('container');
  console.log(container);

  /* HTMLElement properties*/
  container.childNodes;
  container.children;
  container.classList; //DOMTokenList // methods add, contains, remove, toggle 
  container.className; //Set classes (space separated)
  container.firstChild;
  container.localName;
  container.nodeName;
  container.parentNode;

  innerDIV.innerHTML;
  innerDIV.innerText = 'innerDIV';

  /* HTMLElement methods*/
  container.setAttribute('data-my-attribute', 'my-value');
  var val = container.getAttribute('data-my-attribute');
  console.log(val);

  innerDIV.setAttribute('class', 'my-class');
  val = innerDIV.getAttribute('class');
  console.log(val);

  /* Node methods*/
  container.appendChild(innerDIV);
  container.getElementsByClassName('my-class');
  container.querySelector('.my-class');

  innerDIV.remove();

  newDIV = innerDIV.cloneNode();
  container.appendChild(newDIV);

  console.log(newDIV.isEqualNode(innerDIV));
  console.log(newDIV.isSameNode(innerDIV));

  container.insertBefore(innerDIV, newDIV)

  /* Style properties are generally the same as in CSS but using camelCase */
  newDIV.style.height = '100px';
  newDIV.style.background = 'black';
  newDIV.style.borderRadius = '10px';

  innerDIV.style.setProperty('height', '100px');
  innerDIV.style.setProperty('background', '#333');
  innerDIV.style.setProperty('opacity', 0.5);
  innerDIV.style.setProperty('border-radius', '10px');
  innerDIV.style.setProperty('margin', '10px 0');
  innerDIV.style.setProperty('text-align', 'center');
  innerDIV.style.setProperty('line-height', '100px');
  innerDIV.style.setProperty('font-size', '20px');
  innerDIV.style.setProperty('color', 'white');

  /* Events */
  innerDIV.addEventListener('click', function (event) {
    event.target.style.color = 'red';
    event.target.removeEventListener('click');
  });

  /* EventTarget */

  /* Some sample events */
  innerDIV.onbeforecopy = function(){}
  innerDIV.onbeforecut = function(){}
  innerDIV.onbeforepaste = function(){}
  innerDIV.onblur = function(){}
  innerDIV.onchange = function(){}
  innerDIV.onclick = function(){}
  innerDIV.onclose = function(){}
  innerDIV.oncontextmenu = function(){}
  innerDIV.oncopy = function(){}
  innerDIV.oncut = function(){}
  innerDIV.ondblclick = function(){}
  innerDIV.ondrag = function(){}
  innerDIV.ondragend = function(){}
  innerDIV.ondragenter = function(){}
  innerDIV.ondragleave = function(){}
  innerDIV.ondragover = function(){}
  innerDIV.ondragstart = function(){}
  innerDIV.ondrop = function(){}
  innerDIV.onfocus = function(){}
  innerDIV.oninput = function(){}
  innerDIV.onkeydown = function(){}
  innerDIV.onkeypress = function(){}
  innerDIV.onkeyup = function(){}
  innerDIV.onload = function(){}
  innerDIV.onmousedown = function(){}
  innerDIV.onmouseenter = function(e){this.style.opacity = 0.8}
  innerDIV.onmouseleave = function(e){this.style.opacity = 0.5}
  innerDIV.onmousemove = function(){}
  innerDIV.onmouseout = function(){}
  innerDIV.onmouseover = function(){}
  innerDIV.onmouseup = function(){}
  innerDIV.onpaste = function(){}
  innerDIV.onresize = function(){}
  innerDIV.onscroll = function(){}
  innerDIV.onshow = function(){}
  innerDIV.onsubmit = function(){}
  innerDIV.ontoggle = function(){}

  //XMLHttpRequest
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    console.log(this.readyState);
  };
  request.open('POST', '/myresource');
  request.send('data=' + JSON.stringify({name:'name'}));
};

function MyThing () {

    this.basicThing = 'basic';
    this.thing = 'thing';
}

MyThing.prototype = {

  printThing : function () {console.log(this.thing)}

};


MyOtherThing = function () {
  MyThing.apply(this);
  this.thing = 'otherthing'

}

MyOtherThing.prototype = new MyThing();
MyOtherThing.prototype.printThing = function(){
  MyThing.prototype.printThing.call(this);
  MyThing.prototype.printThing.call(this);
};
