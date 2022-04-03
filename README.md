# codesamples-nodejs-ts-smart-home-simulator
Node.js and Golang binary Smart Home Dev Simulator
# Installation
1) git clone git clone https://github.com/giantpanda9/codesamples-nodejs-ts-smart-home-simulator
2) cd codesamples-nodejs-ts-smart-home-simulator
3) npm install
4) npm run start
5) the repository should already include the Golang smart device binary located in /bios/goSmart in both /dist and /src folders, however, if you wish to see the source code of the Golang part or rebuild it for your Linux, please see the corresponding repository
6) At the moment Golang binary is already included inthis package so you need not to build it yourself, the Node.js part will automaically run the Golang binary and start talking to it, so just run npm install -> npm run start, like suggested in points 1-4 and that should be it

# The questions that could be asked on the first place for this code (FAQ based on probability):
1) 
 ## Q: Why AJAX is used instead of IoT signalling system for an instance?**
 
 ## A: The answer will be given in three distinct sections, each of those provides a single seprate reason why AJAX is used.
    ### 1) As per task decription this is a simulator, a model, which required to trace and debug possible ways of exchanging an ivformation between modules and "the brain", AJAX is the most developed data exchanging system, a mature one, this means that there are popular instruments to debug it - like Postman that has been used as part of this development process - and it is much easier to check, which signal goes where and when, this saved time during development process. In short, to develop and debug quicker and save time.    
    ### 2) Besides, as per task description I should keep in mind the architecture of the device/system and the system I am going to simulate in some way - not to 100% - was already described on free code camp - https://www.freecodecamp.org/news/the-most-robust-and-secure-home-automation-system-6d0ddbb39f29/ . Though they use MongoDB there to keep a JSON signals and commands, I hardcode them(it is a quick-to-build-simulator, not a real system,afterall). There are many similar systems described via the Internet - the one proposed via freecodecamp is the closest one. In short, analogues are present to keep them in mind.    
    ### 3) This is not a 100% simulator system, in some way. Given the necessity it could be expanded to be working as a real hardware based Smart House system given some architecture additions and tiny changes would be implemented. Raspberry Pi systems (and similar systems as well) did support the Golang installation and if Golang part, which located in a bios folder will be upgraded to access the hardware ports of the Raspberry Pi via the low-level implementation (Golang is like C/C++ afterall) the bios part will stay on Raspberry Pi (let's say under Raspbian, but any Linux would do) it can still communicate with the central "brain" - hub via AJAX, while actual and real Switches, Air Conditioners and Heaters will connected from there by smartGo binary via hardware ports using driver-boards or hand-made interface boards connected to Raspberry Pi input ports. This way require additional investigation and not requested via task description directly therefore it is postponed and only shallow research is done for now on this matter. In short, even in this state it is theoretically possible to upgrate this system to a real working one - even based on AJAX - or so it seems.
   
2)
  ## Q: Why Golang?
  ## A: The answer again will be given in three distinct sections, each of those provides a single seprate reason why AJAX is used.  
     ### 1) Roleplay reasons, it is like in a theater, the Smart Device system should be considered like something external and even alien to the hub or brain system, because technically "the brain" should be controlling any Smart Device (reasonably speaking), so Golang's purpose is to simulate this somewhat random smart device. And as I have been told during communication about the possible implementation - that would be a great and interesting point to (a quote) "implement matser control using one language and other units in another one".     
     ### 2) Besides the Go binary is not just a simulator - like it was said in question 1, the Golang generated binary is a basis for the further development of Basic input and output system (BIOS), which will translate AJAX to some hardware port signals to a real Smart Devices using Raspberry Pi, for example.     
     ### 3) The main difference of Go and JavaScript and Node.js is a different approach to multi-threading/multi-processing parallel systems. Go based on Goroutines a seprate process that could be created from a main one and yet have an easy access to the whole lexical and name spacing of the main program. In some cases it would be easy, like in a current example and in systems where this could become harder a messages that Goroutines can exchange can solve this issue. In particular case, Golang was really helpful, when solving the issue with the Heater, which was and intellectual device in its own turn. The Golang allowed to use an AfterFunc function to create a seprate Goroutine, which is supposed to turn off the heater after 25 minutes passed in a simple and elegant way as shown below:
```
if signal == "cold" && comingBackSoon { // if we received a singal that somebody would come back soon
			if (heaterSwitch == false) { // double check that the heater is turned off
				heaterSwitch = true /// turn it on
				time.AfterFunc(25 * time.Minute, func() { // and schedule a Goroutine to run in 25 minutes
					heaterSwitch = false // to turn it off
				})
			}
		}
```
3)
  ## Q: Is Golang an OOP style language?
  ### A: Though Golang does not have a "classic" OOP implementation (not classic does not mean it is improper), with the "class"-like keywords, it still supports and hierarchy of objects, which are the main characteristic of OOP designed applications, but in more lightweight way. Types in Go can be embedded in other types, which result in something similar to subclassing. It supports encapsulation, interfaces and methods. The only main (and noticeable) difference from classic OOP is that Go is using Composition instead of Ineritance, which allows the creation of complex types by combining objects or components of other types, while inheritance based on a base and/or parent class ancestry. So, summarzing all that said, the Go does not violate the rule to implement the test in proper OOP style, it is still a proper-OOP language, just does it differently.
4)
  ## Q: Why some of code implementations are different from task description and some additional data taken from the Weather providing API?
  ### A: I took a liberty, I hope it will not violate the rules in a significant way, to improve the logic of the Smart Device simultor working in a very tiny way as follows: 
    ### 1) The Switch - it looks like that "hot" and "cold" signals are being send to it at a random pace, no conditions described (at least in my edition of the task description or I missed those) in the document. So, I took additional data from the Weather API proposed and now the switch will turn on and off based on the time of sunrise and sunset. Not complete approach, to improve it, it would also be great to take cloudiness and visibility into account, but just do not wanted to violate the rules too much.    
    ### 2) In case of air conditioner unit, it seems like its temperature would increase up to no limit, the same could be said in relation to decrease - to avoid this a comfort temperature parameter is added (its value could be changed in the config file) to limit the temperature that Air Conditioner Unit might produce both for cold and hot.
    ### 3) And in case of Heater, nothing changed too much, just added a check that it is already turned on, so that no new Gourutines would be created to turn it off - of course those would finish their task and stop working in order of creation (the first one, will exit last), but there is no reason to create too many similar instances of code to execute.

