const { jsPDF } = window.jspdf;
import {_malgun_gothic, _courtbt} from './fonts.js';
import {_facts} from './samples.js';


var current_fs, next_fs, previous_fs;
var animating = false;





$(document).on('click', '.next', function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    next_fs.show();
    current_fs.hide();

    animating = false;
  }
);
//$(document).on('click', '.next', goso_print);

$(document).on('click', '.prev', function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    previous_fs.show();
    current_fs.hide();

    animating = false;
  }
);

$(document).on('click', '.print', goso_print);

var doc = new jsPDF();

//Set font
doc.addFileToVFS("malgun_gothic.ttf", _malgun_gothic);
doc.addFont("malgun_gothic.ttf", "malgun_gothic", "normal");
doc.addFileToVFS("courtbt.ttf", _courtbt);
doc.addFont("courtbt.ttf", "courtbt", "normal");
doc.setFont("courtbt");
//Set Properties
doc.setProperties({
  title: '고소장',
  subject: '고소장',
  author: '고소와 소송',
  keywords: '',
  creator: '고소와 소송'
});
//A4 - 210mm * 297mm 
const WIDTH = 210;
const HEIGHT = 297;

const UP = 35;
const DOWN = 30;
const SIDE = 30;
const SIDE2 = 55;

const TITLESIZE = 24;
const SUBTITLESIZE = 18;
const FONTSIZE = 12;

const MAXWIDTH = 150;
const MAX_Y = HEIGHT - DOWN - TITLESIZE;
const LINEHEIGHT = 9;

var current_y;
var current_page;

function goso_print(){
  
  current_page = 1;
  current_y = UP;

  addTitle("고 소 장", TITLESIZE);
  enter();

  doc.setFontSize(FONTSIZE);
  doc.text("고 소 인", SIDE, current_y);
  doc.text(document.getElementById('p_name').value, SIDE2, current_y);
  enter();
  doc.text(document.getElementById('p_address').value, SIDE2, current_y);
  enter();
  doc.text(document.getElementById('p_phone').value, SIDE2, current_y);
  enter();
  doc.text("피고소인", SIDE, current_y);
  doc.text("김철수", SIDE2, current_y);
  enter();
  doc.text("성남시 수정구 수정대로 36, 205동 204호", SIDE2, current_y);
  enter();
  enter();

  addTitle("고 소 취 지", SUBTITLESIZE);
  addText(_facts[0][0]);
  
  addTitle("범 죄 사 실", SUBTITLESIZE);
  addText(_facts[0][1]);

  addTitle("고 소 이 유", SUBTITLESIZE);
  addText(_facts[0][2]);

  addTitle("증 거 자 료", SUBTITLESIZE);
  addText(_facts[0][3]);

  addTitle("관련사건의 수사 및 재판 여부", SUBTITLESIZE);
  enter();
  enter();

  addTitle("2022. 10.", FONTSIZE);
  addTitle("고소인 노환준", FONTSIZE);

  

  addPageNumber();


  doc.save("a4.pdf");
}

function addTitle(text, size){
  checkPageHeight();

  doc.setFontSize(size);
  doc.setFont("malgun_gothic");
  doc.text(text, WIDTH / 2, current_y, "center");
  doc.setFontSize(FONTSIZE);
  doc.setFont("courtbt");
  enter();
}

function addText(text){
  var textString = doc.splitTextToSize(text, MAXWIDTH);
  for(var i=0;i<textString.length;i++){
    checkPageHeight();

    doc.text(textString[i], SIDE, current_y);
    enter();
  }
  enter();
}

function checkPageHeight(){
  if(current_y > MAX_Y){
    addPageNumber();
    current_page++;

    doc.addPage();
    current_y = UP;
  }
}
function addPageNumber(){
  doc.text("- "+current_page+" -", WIDTH / 2, HEIGHT - 15, "center");
}

function enter(){
  current_y = current_y + LINEHEIGHT;
}