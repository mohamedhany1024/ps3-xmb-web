        let sony = document.getElementById("sony");
		let startupSound = new Audio();
		let clickSound = new Audio();
		let splash = document.getElementById("ps3");
		let icons = document.getElementById("icons");
		let bio = document.getElementById("birosol");
		let tilt = document.getElementById("tilt");
		let mine = document.getElementById("Minecraft");
		let games = document.getElementsByClassName("game");
		let menuItems = document.getElementsByClassName("menuItem");
		var menuRect = icons.getBoundingClientRect();
		let submenuContainer = document.querySelector("#submenuOptions");
		bio.style.opacity = "0";
		tilt.style.opacity ="0";
		mine.style.opacity ="0";
		startupSound.src = "ps3_startup2.wav";
		clickSound.src ="PS_Click.wav";
		startupSound.play();
		sony.style="opacity: 0";
		icons.style.opacity="0";
		icons.style.transform = "scale(2.5)";
		splash.style ="filter: brightness(0)";
		setTimeout(()=> {
			splash.style="filter: brightness(120%); saturate(100%)";

		}, 300);
		setTimeout(()=> {
			sony.style="opacity: 1";
			sony.style.maskPosition = "0%"
		}, 2000);
		setTimeout(()=> {
			sony.style="opacity: 0";
			
		}, 8000);
		setTimeout(()=> {
			icons.style.opacity="1";
			icons.style.transform = "scale(2)";
			icons.style="transform: scale(1)";
			//splash.style = "filter: brightness(90%) hue-rotate(90deg) saturate(120%);";
		}, 10000);
		setTimeout(()=> {
			bio.style.opacity = "1";
			tilt.style.opacity ="1";
			mine.style.opacity ="1";
			sony.style.display = "none";
		}, 12000);
		

        


		let aSize = games.length-1;
		
		let currentSelectedGame = 0;
		let menuSize = menuItems.length-1;
		let currentSelectedItem =0;
		let menuX = 70; 
		let mahCurrentRect;
		games[currentSelectedGame].style.transform = "scale(1.6)";
		menuItems[currentSelectedItem].style.transform = "scale(1.3)";

        function loadSubmenuOptions(parentMenuIndex) {
            currentSelectedGame = 0;
			
            
            submenuContainer.innerHTML = "";
            console.log("clearing exexcuted");
            let submenuData =  JSON.parse(menuItems[parentMenuIndex].getAttribute("submenu--data"));
            console.log(submenuData.length);
            for (i=0; i<submenuData.length; i++) {
                console.log("sucks to be a submenu");
                submenuContainer.innerHTML += `<p class="game menuOption">${submenuData[i].name}</p>`;
            }

			games = document.getElementsByClassName("game");
			aSize = games.length-1;
        }
		

		document.addEventListener('keydown', 
			function(event) {
				if (event.key == "ArrowDown") {
					//alert("Down");
					if (currentSelectedGame+1 <= aSize) {
                        games[currentSelectedGame].classList.remove("hover--pulsing");
                        games[currentSelectedGame+1].classList.add("hover--pulsing");
						games[currentSelectedGame].style.transform ="scale(1)";
						games[currentSelectedGame+1].style.transform="scale(1.6)";
						currentSelectedGame++;
						clickSound.play();
					}
				}
			}
		
		);

		document.addEventListener('keydown', 
		function(event) {
			if (event.key == "ArrowUp") {
		//alert("Down");
				if (currentSelectedGame-1 >= 0) {
                    games[currentSelectedGame].classList.remove("hover--pulsing");
                    games[currentSelectedGame-1].classList.add("hover--pulsing");
					games[currentSelectedGame].style.transform ="scale(1)";
					games[currentSelectedGame-1].style.transform="scale(1.6)";
					currentSelectedGame--;
					clickSound.play();
				}
			}
		}
		
		);

		document.addEventListener('keydown', 
			function(event) {
				if (event.key == "ArrowRight") {
					//alert("Down");
					if (currentSelectedItem+1 <= menuSize) {
						mahCurrentRect = menuItems[currentSelectedItem+1].getBoundingClientRect();
						if (mahCurrentRect.left <= screen.width/2) {
							icons.style.transform = `translateX(${document.querySelector("#icons").getBoundingClientRect().left + Math.abs(mahCurrentRect.left - screen.width/2)}px)`;
						} else {
							icons.style.transform = `translateX(${document.querySelector("#icons").getBoundingClientRect().left - Math.abs(mahCurrentRect.left - screen.width/2)}px)`;
						}
						
						menuX+=15;
                        
						menuItems[currentSelectedItem].style.transform ="scale(1)";
						menuItems[currentSelectedItem].style.filter = '';
						menuItems[currentSelectedItem+1].style.transform="scale(1.6)";
						menuItems[currentSelectedItem+1].style.filter = 'drop-shadow(0 0 4px #999999)'
						currentSelectedItem++;
                        loadSubmenuOptions(currentSelectedItem);
						clickSound.play();
					}
				}
			}
		
		);

		document.addEventListener('keydown', 
			function(event) {
				if (event.key == "ArrowLeft") {
					//alert("Down");
					if (currentSelectedItem-1 >= 0) {
						mahCurrentRect = menuItems[currentSelectedItem-1].getBoundingClientRect();
						if (mahCurrentRect.left <= screen.width/2) {
							icons.style.transform = `translateX(${document.querySelector("#icons").getBoundingClientRect().left + Math.abs(mahCurrentRect.left - screen.width/2)}px)`;
						} else {
							icons.style.transform = `translateX(${document.querySelector("#icons").getBoundingClientRect().left - Math.abs(mahCurrentRect.left - screen.width/2)}px)`;
						}
						menuX-=15;
                        
						menuItems[currentSelectedItem].style.transform ="scale(1)";
						menuItems[currentSelectedItem].style.filter = '';
						menuItems[currentSelectedItem-1].style.transform="scale(1.6)";
						menuItems[currentSelectedItem-1].style.filter = 'drop-shadow(0 0 10px #aaaaaa)'
						currentSelectedItem--;
                        loadSubmenuOptions(currentSelectedItem);
						clickSound.play();
					}
				}
			}
		
		);
		
		
		
		
		function openGame(idd) {
			icons.style.opacity="0";
			icons.style.transform+="scale(2.5)";
			setTimeout(()=> {
				window.location.href =idd;
			}, 700);
		}
		
		document.addEventListener('keydown', function(event) {
			if (event.key =="Enter") {
				//openGame(games[currentSelectedGame].id);
				console.log("asd");
				let submenuData = JSON.parse(menuItems[currentSelectedItem].getAttribute("submenu--data"));
				console.log(submenuData[currentSelectedGame]);
				if (submenuData[currentSelectedGame].actionType == "openPhoto") {
					window.location.href = submenuData[currentSelectedGame].actionArg;
				} else if (submenuData[currentSelectedGame].actionType == "openGame") {
					openGame(submenuData[currentSelectedGame].actionArg);
				}
			}
		})

