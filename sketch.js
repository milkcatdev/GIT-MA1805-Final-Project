let password = 'Javascript';
//password to unlock
let input;
let enteredpw = '';
let incorrectpw = false;
//variables to handle password checker
let showhint = false;
let hintTime = 0;
//variable to track when hint is shown

let currmessagetime;
//variable to store
let currscreen = 0;
//variable to handle which screen is currently being displayed
let angle = 0;
//sets angle for spinning loading circle


//variables that handle the loading screen and blurring transition
let loadingscreenstart = 0;
let loadingscreenduration = 5000;
let blurring = true;
let blurlevel = 10;
let blurdecrement = 0.5;

//index variable to store the current display for Perl
let perlindex=0;
//booleans to control which windows are visible on the screen
let perlwindow = false;
let photoalbum_app = false;
let messenger_app = false;
let taskmanager_app = false;
let console_app = false;

let messageindex = 0; 
//index determining which character in the string is being handled
let previouschar = 0; 
//logs when the previous character was typed
let typedmessage = false;

let perldialogueindex = 0
let showingimages = [false, false, false, false ,false];
let antivirusdisabled = false;
let candisableantivirus = false;

//temporary image display variables
let imgstart = 0;
//variable that logs when the image first appears
let imageDuration = 2000; 
//variable that sets the duration of images

let showviruswarning = true;
//variable that handles temporary virus message

let console_error;

function temporaryimage(tempimage, x, y, w, h, duration) {
  //function to temporarily display images
  if (imgstart === 0) {
    imgstart = millis();
  }
  if (millis() - imgstart < duration) {
    image(tempimage, x, y, w, h);
  } else {
    if (imgstart !== -1) {
      imgstart = -1;
    }
  }
}

let keysfx = [];
let voicesfx;

function preload(){

  for (let i = 0; i <= 8; i++) {
    keysfx[i] = loadSound(`Resources/Audio/k${i+1}.mp3`);
  }
  
  //loads all key sound effects to an array

  voicesfx = loadSound('Resources/Audio/voice.mp3');
  clicksfx = loadSound('Resources/Audio/clicksfx.mp3');

  //other sfx

  console_error = loadStrings('Resources/console.txt');

  screenlines = loadImage('Resources/Images/screenlines.png');
  lockscreenbg = loadImage('Resources/Images/lockscreen.png');
  lockscreenbg2 = loadImage('Resources/Images/lockscreen1.png');
  noicon = loadImage('Resources/Images/Icons/noicon.png');
  hintbutton = loadImage('Resources/Images/Icons/hintbutton.png');
  enterbutton = loadImage('Resources/Images/Icons/enterbutton.png');
  bottombar = loadImage('Resources/Images/bottombar.png');
  viruswarning = loadImage('Resources/Images/Icons/viruswarning.png');

  //UI image files

  homeicon = loadImage('Resources/Images/Icons/homeicon.png');
  albumicon = loadImage('Resources/Images/Icons/photoalbum.png');
  messengericon = loadImage('Resources/Images/Icons/messengericon.png');
  taskmanagericon = loadImage('Resources/Images/Icons/taskmanagericon.png');
  sysicon = loadImage('Resources/Images/Icons/systemicon.png');
  prgicon = loadImage('Resources/Images/Icons/programicon.png');

  //loads of icons!!

  albumphoto1 = loadImage('Resources/Images/Album/face.png');
  albumphoto2 = loadImage('Resources/Images/Album/face_noise.png');
  albumphoto3 = loadImage('Resources/Images/Album/face_mezzotint.png');
  //album photos

  windowborder = loadImage('Resources/Images/windowborder.png');
  greywindow = loadImage('Resources/Images/windowgreybg.png');
  plainwindow = loadImage('Resources/Images/windowplain.png');
  verticalwindow = loadImage('Resources/Images/verticalwindow.png');
  blackwindow = loadImage('Resources/Images/windowblack.png');
  //images for windows


  breathe1 = loadImage('Resources/Images/GIFS/breathe1.png');
  breathe2 = loadImage('Resources/Images/GIFS/breathe2.png');
  breathe3 = loadImage('Resources/Images/GIFS/breathe3.png');

  perlnoface = loadImage('Resources/Images/GIFS/noface.png');
  scribble1 = loadImage('Resources/Images/GIFS/scribble1.png');
  scribble2 = loadImage('Resources/Images/GIFS/scribble2.png');
  scribble3 = loadImage('Resources/Images/GIFS/scribble3.png');
  foundface1 = loadImage('Resources/Images/GIFS/foundface1.png');
  foundface2 = loadImage('Resources/Images/GIFS/foundface2.png');
  foundface3 = loadImage('Resources/Images/GIFS/foundface3.png');
  hurt1 = loadImage('Resources/Images/GIFS/hurt1.png');
  hurt2 = loadImage('Resources/Images/GIFS/hurt2.png');
  hurt3 = loadImage('Resources/Images/GIFS/hurt3.png');
  hurt4 = loadImage('Resources/Images/GIFS/hurt4.png');
  scared = loadImage('Resources/Images/GIFS/scared.png');
  cursor = loadImage('Resources/Images/cursor.png');

  //images used in GIFs

}

function setup() {
  createCanvas(1280, 720);
  noCursor();
  //hides cursor to replace with drawn one
  
  breathinggif = [breathe1, breathe2, breathe3];
  scribblegif = [scribble1, scribble2, scribble3];
  hurtgif = [hurt1, hurt2, hurt3, hurt4];
  //assigns gif frames to arrays

  //sets font to something cool
  textFont('Tahoma');

  passwordinput = createInput('');
  passwordinput.position(width / 2 - passwordinput.width / 2, height - 160);
  passwordinput.hide();
  //creates input box DOM element and hides until log in screen

  noStroke();
  textAlign(CENTER);
  fill(51, 1, 22);
}

function draw() {
  let currentTime = getCurrentTime();
  displayscreen();
  imageMode(CENTER);
  image(cursor, mouseX, mouseY, 16, 16);
  image(screenlines,width/2,height/2,width,height);
}

function playsfx(effect){
  keysfx[effect].play();
}

function keyPressed() {

  //handles sound effects, with random keys when you press most keys
  //while enter, space and backspace all have their own unique sfx
  if (keyCode === 13) {
    playsfx(0);
    if (currscreen==1){
      checkpassword();
    }
  }
  else if (keyCode === 32){
    playsfx(1);
  }
  else if (keyCode === 8){
    playsfx(2);
  }
  else{
    playsfx(floor(random(3, 8)));
  }

  
}

function getCurrentTime() {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  return nf(hours, 2) + ":" + nf(minutes, 2);
  //formats the current system time
}

function displaydate(x, y, size, format) {
  //a function that gets the current date using javascript's built in fancy technology
  //it takes the format as a parameter and either outputs as Weekday, Day of month OR DD/MM/YYYY
  let currentdate = new Date();
  let dayofweek = currentdate.toLocaleString('en-us', { weekday: 'long' });
  let month = currentdate.toLocaleString('en-us', { month: 'long' });
  let dayofmonth = currentdate.getDate();
  let year = currentdate.getFullYear();
  let formattedDate = format === 0

  ? `${dayofweek}, ${month} ${dayofmonth}` 
  : `${dayofmonth < 10 ? '0' + dayofmonth : dayofmonth}/${(currentdate.getMonth() + 1) < 10 ? '0' + (currentdate.getMonth() + 1) : currentdate.getMonth() + 1}/${year}`;
  //Formats the date by using a ternary operator, a faster (but confusing) way to skip over using if statements
  //I could not do this from memory, I have google to thank

  displaytext(formattedDate, x, y, size, format === 0 ? 255 : 0, false);

}



function displaytime(x,y, size){

  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let currentTime = nf(hours, 2) + ":" + nf(minutes, 2);

  textSize(size);
  text(currentTime, x, y);
}

function displayMessage(msg, x, y, fontsize, duration, triggervar) {
  //function to temporarily print text on the screen
  textSize(fontsize);
  textAlign(CENTER);
  fill(51, 1, 22);
  text(msg, x, y);

  if (millis() - currmessagetime > duration) {
    triggervar = false;
    //hides the message after it exceeds given duration
  }
}

function loadingcircle(x, y, size, speed) {
  //function to draw loading circle
  noFill();
  translate(x, y);
  strokeWeight(6);
  
  let arclength = TWO_PI / 100;
  for (let i = 0; i < 100; i++) {
    let segmentStart = angle + arclength * i;
    let segmentEnd = segmentStart + arclength;
    let opacity = lerp(255, 0, (i / 100) * 2);
    stroke(255, opacity);
    arc(0, 0, size, size, segmentStart, segmentEnd);
  }
  angle -= speed;
  resetMatrix();
}


function displayscreen(){

  if (currscreen == 0) {
    //initial start screen
    background(0);
    fill(255);
    textSize(60);
    text("Virus", width/2, 100);
    playgif(hurtgif, width/2, height/2, 400, 400, 20);
    textSize(30);
    text('An interactive project based on security\n\n Click the mouse to interact with the things on your screen. \n\nClick to begin', width/2, height/2);
  }
  if (currscreen == 1) {
    //lockscreen. Hint: The password is Javascript!!
    fill(255);
    imageMode(CORNER);
    image(lockscreenbg, 0, 0, width, height);
    
    imageMode(CENTER);
    image(noicon, width/2, 350, 200, 200);
    image(hintbutton, width/2, 620, 25,25);
    image(enterbutton, 750, 571, 25,25);
        
    displaydate(width/2, 180, 25, 0);
    text('User', width/2, 475);
    passwordinput.show();
    displaytext('enter password:', width/2, 545, 16, 255);

    displaytime(width/2, 120, 60);
    
    if (showhint==true) {
      stroke(80, 74, 247);
      fill(255, 255, 255, 150);
      rectMode(CENTER);
      rect(width / 2, height-55, 430,25, 5, 5, 5, 5);
      noStroke();
      displayMessage("hint: what programming language is this project written in?", width / 2, height-50, 15, 2000, showhint);
    }
    if (showhint && millis() - hintTime > 2000) {
      showhint = false;
      //hides hint after 2 seconds
    }
    validatepassword();
    //checks if inputted password matches
  }

  if (currscreen == 2) {
    if (loadingscreenstart === 0) {
      loadingscreenstart = millis(); 
      //sets the start time when switched to the loading screen
    }
    passwordinput.hide();
    imageMode(CORNER);
    image(lockscreenbg, 0, 0, width, height);
    imageMode(CENTER);
    filter(BLUR, 10);
  
    displaytext('Logging in User', width / 2, 150, 60, 255, false);
    loadingcircle(width / 2, height / 2, 60, 0.08);
    //draws the loading screen and loading circle

    if (millis() - loadingscreenstart > loadingscreenduration && currscreen == 2) {
      currscreen = 3;
      //switches to the next screen after time is up
    }
  }
  
  if (currscreen == 3) {
    //home screen
    background(245, 230, 244);
    imageMode(CORNER);
    image(lockscreenbg, 0, 0, width, height);
    image(bottombar, 0, height-50, width, 50);
    image(homeicon, 10, height-45, 40, 40);
    if (showviruswarning==true){
      temporaryimage(viruswarning, width-300, 500, 260, 160, 6000);
      //displays virus warning message
    }
  
    fill(197, 205, 219);
    stroke(218, 225, 237);
    strokeWeight(2);
    fill(0);
    textAlign(CENTER);
    displaytime(width-50, 689, 15);
    displaydate(width-50, 705, 13, 1);
  
    if (blurring) {
      blurTransition();
      //blurs out to fade into the home screen
    }
  
    imageMode(CENTER);
    image(albumicon, 100, 100, 60, 60);
    displaytext('photos', 100, 140, 15, 0, false);
    image(messengericon, 100, 200, 60, 60);
    displaytext('messages', 100, 235, 15, 0, false);
    image(taskmanagericon, 100, 300, 60, 60);
    displaytext('task manager', 100, 337, 15, 0, false);
    //draws home screen app icons

    if (perlwindow){
      image(greywindow, width / 2, height / 2, 590, 380);
      perlstate();
      //draws a window for Perl whenever she is on screen
    }
   
    if (photoalbum_app) {
      //visuals for photo album
      image(plainwindow, 500, 295, 590, 380);
      image(albumphoto1, 300, 200, 50, 50);
      displaytext('face.png', 300, 250, 10, 0, false);
      image(albumphoto2, 380, 200, 50, 50);
      displaytext('face?.png', 380, 250, 10, 0, false);
      image(albumphoto3, 460, 200, 50, 50);
      displaytext('fac=3,.png', 460, 250, 10, 0, false);
      displaytext('photos', 230, 115, 10, 0, false);

      if (showingimages[0]){
        filter(BLUR,8);
        image(albumphoto1, width/2, height/2, 300, 300);
        image(windowborder, width/2, height/2, 300, 300);
        dialoguebox(width/2, 600, 200, 40, 'close',20);
      }
      else if (showingimages[1]){
        filter(BLUR,8);
        image(albumphoto2, width/2, height/2, 300, 300);
        image(windowborder, width/2, height/2, 300, 300);
        dialoguebox(width/2, 600, 200, 40, 'close',20);
      }
      else if (showingimages[2]){
        filter(BLUR,8);
        image(albumphoto3, width/2, height/2, 300, 300);
        image(windowborder, width/2, height/2, 300, 300);
        dialoguebox(width/2, 600, 200, 40, 'close',20);
      }
    }
  
    if (messenger_app) {
      //displays messenger app.. but it's redundant :(
      image(verticalwindow, 320, 340, 300, 480);
      displaytext('Messages', 320, 140, 25, 0, false);
      displaytext('friends online: 0', 320, 175, 15, 0, false);
      displaytext('Notifications', 320, 210, 18, [11, 126, 179], false);
      
      stroke(41, 81, 99);
      rectMode(CENTER);
      fill(197, 216, 224)
      rect(320,400,230,300);

      fill(174, 198, 209);
      for (i=0; i<6; i++){
        y = 235
        offset = 60
        rect(320,(y+offset*i),230,30);
      }
      
      displaytext('SYSTEM : Welcome to Messeng...', 320, 245, 15, 0, false);
    }

    if (taskmanager_app){
      //will show if the taskmanager is opened
      image(plainwindow, 470, 290, 590, 380);
      image(prgicon, 250, 250, 30, 30);
      displaytext('Task Manager', 470, 150, 25, 0, false);
      displaytext('3 Processes Running', 470, 180, 15, 0, false);
      textAlign(LEFT);
      displaytext('perl.exe               CPU - 87%', 300, 250, 15, 0, false);
      displaytext('potentially dangerous !', 512, 250, 13, [140, 0, 26], false);
      image(sysicon, 250, 300, 30, 30);
      displaytext('system                 CPU - 18%', 300, 300, 15, 0, false);
      //displays the task manager window

      if(antivirusdisabled==false){
        image(sysicon, 250, 350, 30, 30);
        displaytext('antivirus             CPU - 3%', 300, 350, 15, 0, false);
        dialoguebox(700, 350, 60, 20, 'end task', 13);
      }
      dialoguebox(700, 250, 60, 20, 'end task', 13);
      dialoguebox(700, 300, 60, 20, 'end task', 13);
      
    }
  }

  if (currscreen ==4){
    //blue screen of death! AKA ending screen
    background(75, 123, 201);
    displaytext('Something went wrong :(', width/2, 300, 50, 255, false);
    displaytext("Your PC ran into a problem that it couldn't handle..\n Thanks for playing!", width/2, 400, 20, 255, false);
  }
}

function mouseClicked() {
  clicksfx.play();
  console.log('MouseX:',mouseX,'MouseY:',mouseY);

  if (currscreen==0){
    currscreen=1;
    //moves to next screen
  }
  if (currscreen==1){
    if (mouseX > 628 && mouseX < 660 && mouseY > 608 && mouseY < 640) {
      showhint = true;
      hintTime = millis();
    } else if (mouseX > 750 && mouseX < 770 && mouseY > 570 && mouseY < 590) {
      checkpassword();
      //adds functionality to hint and enter buttons on screen
    }
  }
  else if (currscreen==3){

    //adds functionality to home screen icons, opening their respective windows
    if (mouseX>74 && mouseX<138 && mouseY>288 && mouseY<333){
      taskmanager_app = !taskmanager_app;
    }
    else if (taskmanager_app){
      if (mouseX>755 && mouseX<765 && mouseY>107 && mouseY<117){
        taskmanager_app = !taskmanager_app;
      }
      else if(mouseX>677 && mouseX<738 && mouseY>246 && mouseY<267){
        perlwindow=true;
        taskmanager_app = !taskmanager_app;
      }
      else if (candisableantivirus==true && antivirusdisabled==false && mouseX>677 && mouseX<738 && mouseY>346 && mouseY<367){
        antivirusdisabled = true;
        taskmanager_app = !taskmanager_app;
        perlindex=8;
      }
    }
    else if (mouseX>74 && mouseX<135 && mouseY>83 && mouseY<152){
      photoalbum_app = !photoalbum_app;
      //triggers photo album window
    }
    else if(mouseX>74 && mouseX<142 && mouseY>182 && mouseY<251){
      messenger_app = !messenger_app;
      //triggers messenger app window
    }
    else if (photoalbum_app){
      if(mouseX>784 && mouseX<800 && mouseY>111 && mouseY<125){
        photoalbum_app = !photoalbum_app;
      }
  
      //opens the photos and previews them if you click on them
      if(mouseX>283 && mouseX<332 && mouseY>181 && mouseY<233){
        showingimages[0]=!showingimages[0];
      }
      if(mouseX>363 && mouseX<412 && mouseY>181 && mouseY<233){
        showingimages[1]=!showingimages[1];
      }
      if(mouseX>442 && mouseX<491 && mouseY>181 && mouseY<233){
        showingimages[2]=!showingimages[2];
      }

      else if(mouseX>550 && mouseX<750 && mouseY>590 && mouseY<630){
        showingimages[0]=false;
        showingimages[1]=false;
        showingimages[2]=false;
      }
    }

    else if (messenger_app){
      //opens and closes the messenger app
      if (mouseX>466 && mouseX<474 && mouseY>107 && mouseY<114){
        messenger_app = !messenger_app;
      }
    }
  
    //handles all mouse events to progress to the next dialogue point with Perl
    if (perlindex==0 && mouseX>548 && mouseX<747 && mouseY>591 && mouseY<621){
      perlindex=1;
    }
    else if (perlindex==1 && mouseX>497 && mouseX<798 && mouseY>591 && mouseY<621){
      perlindex=2;
    }
    else if(perlindex==2 && mouseX>497 && mouseX<798 && mouseY>591 && mouseY<621){
      perlindex=3;
    }
    else if(perlindex==3 && showingimages[0] && mouseX>497 && mouseX<795 && mouseY>216 && mouseY<516){
      perlindex=4;
      showingimages[0] = !showingimages[0];
      photoalbum_app = !photoalbum_app;
    }
    else if (perlindex==4 || perlindex==5|| perlindex==6 && mouseX>397 && mouseX<896 && mouseY>570 && mouseY<641){
      perlindex++;
    }
  }
}

function blurTransition() {
  //function that applies the blur filter, starting at 10 and gradually decreases until it's at 0
  // it then disables the blurring boolean to remove the effect
  if (blurlevel > 0) {
    blurlevel -= blurdecrement; 
    blurlevel = max(blurlevel, 0);
    filter(BLUR, blurlevel);
  } else {
    blurring = false;
  }
}

function typemessage(x, y, size, speed, textToType) {
  //function to type out messages similar to dialogue in an RPG game with
  //a sound effect. It adds characters by scrolling through the string's index and 
  //bases on the speed variable to make text go faster or slower.

  textSize(size);
  textAlign(CENTER, CENTER);
  let currentTime = millis();
  if (currentTime - previouschar > speed && messageindex < textToType.length) {
    previouschar = currentTime;
    messageindex++;
    voicesfx.setVolume(0.2);
    voicesfx.play();
  }
  let displayedText = textToType.substring(0, messageindex);
  displaytext(displayedText, x, y, size, 0, false);
}


function validatepassword(){
  //handles displaying the error message
  if (incorrectpw && millis() - currmessagetime < 2000) {
    if (enteredpw === password) {
      currscreen=2;
    } else {
      displayMessage("The password you have entered is incorrect.\n Please check capitalization and try again.", width / 2, height - 50, 15, 2000, incorrectpw);
    }
  }
}

function checkpassword(){
  //checks password
  enteredpw = passwordinput.value();
    if (enteredpw === password) {
      incorrectpw = true;
      currmessagetime = millis();
    } else {
      if (enteredpw === ''){
      }
      else{
        incorrectpw = true;
        currmessagetime = millis();
      }
    }
}

function displaytext(displayedtext, text_x, text_y, textsize, textcolour, hasoutline, outlinecolour){
  //easily customizable text function
  textSize(textsize);
  noStroke();
  fill(textcolour);
  if (hasoutline){
    stroke(outlinecolour);
  }
  text(displayedtext, text_x, text_y);
  noStroke();
}

function playgif(gifarray, gif_x, gif_y, gifsize_x, gifsize_y, speed) {
  let gifindex = Math.floor(frameCount / speed) % gifarray.length;
  image(gifarray[gifindex], gif_x, gif_y, gifsize_x, gifsize_y);
  //displays gifs based on their arrays
}

function perlstate(){
  //this whole section is like the progression of conversation with Perl.
  //I hate that I used so much iteration and I'm sure there was an easier way to do it,
  //but alas I lack such knowledge..
  if (perlindex==0){
    playgif(breathinggif, width / 2, height / 2, 400, 400, 20);
    dialoguebox(width/2, 600, 240, 35, '> Inspect the program',20);
  }
  else if (perlindex==1){
    image(perlnoface, width/2, height/2, 400, 400);
    playgif(scribblegif, 650,260,110,110,20);
    typemessage(width / 2, 100, 30, 60, 'Hello? Is someone there?...');
    dialoguebox(width/2, 600, 300, 30, '"What happened to your face?"',20);
  }
  else if (perlindex==2){
    image(perlnoface, width/2, height/2, 400, 400);
    playgif(scribblegif, 650,260,110,110,20);
    typemessage(width / 2, 100, 30, 60, "My face.. Please, can you help me find it? \n It's somewhere here.. Please?");
    dialoguebox(width/2, 600, 300, 30, "'Okay, I'll try..'",20);
  }
  else if (perlindex==3){
    image(perlnoface, width/2, height/2, 400, 400);
    playgif(scribblegif, 650,260,110,110,20);
    typemessage(width / 2, 100, 30, 60, "Oh, thank you so much!");
  }

  else if (perlindex==4){
    image(foundface1, width/2, height/2, 400, 400);
    typemessage(width / 2, 100, 30, 60, "You found it!! Thank you so much!!");
    dialoguebox(width/2, 600, 500, 70, "'You're welcome! Wait, so are you some kind\n of program? How are you on my computer?'",20);
  }
  else if (perlindex==5){
    image(foundface2, width/2, height/2, 400, 400);
    typemessage(width / 2, 100, 30, 60, "My name is Perl! I don't really know how I got here.. But I exist\n in your computer's RAM!");
    dialoguebox(width/2, 600, 500, 70, "'RAM?.. That doesn't make much sense..\n Anyway, I got a warning about some virus?..'",20);
  }
  else if (perlindex==6){
    image(foundface3, width/2, height/2, 400, 400);
    typemessage(width / 2, 100, 30, 60, "Virus? I'm not a virus at all, but that thing keeps attacking me!\n Could you do me a favour and disable it?");
    candisableantivirus = true;
    dialoguebox(width/2, 600, 500, 70, "'I guess so..'",20);
  }
    else if (perlindex==7){
      image(foundface2, width/2, height/2, 400, 400);
    typemessage(width / 2, 100, 30, 60, "Perfect! I can't wait!!");
  } 
  
  else if (perlindex == 8) {
    imageMode(CORNER);
    image(lockscreenbg2, 0,0,width,height);
    imageMode(CENTER);
    image(foundface2, width / 2, height / 2, 400, 400);
    typemessage(width / 2, 100, 30, 60, "Why would you trust me?\n Why?");
    playgif(hurtgif,width / 2, height / 2,400,400,20);
    typemessage(width / 2, 2, 20, 20, "I didn't want for it to be this way.. \n I can't control it.. \n I'm sorry..");
    
    
    for (let i = 0; i < console_error.length; i++) {
      textSize(30);
      text(console_error[i], 100, 30 + i * 30);
      //covers the screen in a console error
    }
    setTimeout(() => {
      currscreen = 4;
      //blue screen after 8s :(
    },8000);
  }
}

function dialoguebox(x, y, w, h, dialoguetext, textsize){
  rectMode(CENTER);
  fill(167, 187, 219);
  stroke(60, 85, 125);
  rect(x, y, w, h);
  fill(0);
  textSize(textsize);
  rectMode(CORNER);
  noStroke();
  textAlign(CENTER);
  text(dialoguetext, x, y)
  textSize(20);
  //literally just draws a rectangle with text on top
}
