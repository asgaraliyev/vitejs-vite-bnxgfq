function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const chatEl = document.querySelector("#chat");
const chatFormEl=document.querySelector("#chat-form")
class MessageCtrl {
  constructor({
    createdAt = new Date(),
    updatedAt = new Date(),
    text = "",
    userObj,
    isSender = false,
  }) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.text = text;
    this.userObj = userObj;
    this.isSender = isSender;
  }
  get PPURL() {
    const width = getRandomNumberBetween(300, 500);
    const height = getRandomNumberBetween(300, 500);
    return `https://source.unsplash.com/random/${width}×${height}/?pp`;
  }
  get diffClass() {
    let myClass = "";
    if (this.isSender) {
      myClass = "sent";
    } else {
      myClass = "received";
    }
    return myClass;
  }
  get formatDate() {
    return moment(this.createdAt).format("HH:mm");
  }
  get statusText() {
    let result = "";
    if (this.isSender) {
      result = "Sent";
    } else result = "Received";
    return result;
  }
  get name(){
    let result=""
    if(this.isSender){
      result="You"
    }else result=this.userObj.name
    return result
  }
  get render() {
    return /*html*/ `
        <div class="message  ${this.diffClass} flex flex-row">
       
          <div class="avatar"><img class="rounded-full object-cover" src="${this.PPURL}" alt="Avatar"></div>
          <div>
            <p class="author font-semibold">${this.name}</p>
            <div class="content">
              <div class="text">${this.text}</div>
              <div class="metadata">
                <div class="time font-bold">${this.formatDate}</div>
                <p class="sender ">${this.statusText}</div>
              </div>
          </div>
         
        </div>
        </div>
        
        `;
  }
}
class UserCtrl{
  constructor({name="",phone="",id=0}){
    this.name=name
    this.phone=phone
    this.id=id
  }
}
const messages = [
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "How are you?",
    userObj: new UserCtrl({ name: "John", phone: "123456789", id: 3 }),
    isSender: false,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "I'm doing great!",
    userObj: new UserCtrl({ name: "Sarah", phone: "987654321", id: 4 }),
    isSender: true,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "What's your favorite movie?",
    userObj: new UserCtrl({ name: "Michael", phone: "555555555", id: 5 }),
    isSender: false,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "I love action movies!",
    userObj: new UserCtrl({ name: "Emily", phone: "111111111", id: 6 }),
    isSender: true,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "Do you have any plans for the weekend?",
    userObj: new UserCtrl({ name: "Alex", phone: "222222222", id: 7 }),
    isSender: false,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "Yes, I'm going hiking with friends.",
    userObj: new UserCtrl({ name: "Jessica", phone: "333333333", id: 8 }),
    isSender: true,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "What's your favorite book genre?",
    userObj: new UserCtrl({ name: "David", phone: "444444444", id: 9 }),
    isSender: false,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "I enjoy reading fantasy novels.",
    userObj: new UserCtrl({ name: "Olivia", phone: "555555555", id: 10 }),
    isSender: true,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "Are you excited about the upcoming concert?",
    userObj: new UserCtrl({ name: "William", phone: "666666666", id: 11 }),
    isSender: false,
  }),
  new MessageCtrl({
    createdAt: new Date(),
    updatedAt: new Date(),
    text: "Yes, I can't wait to see my favorite band live!",
    userObj: new UserCtrl({ name: "Sophia", phone: "777777777", id: 12 }),
    isSender: true,
  })
 
];
messages.map((message) => {
  chatEl.innerHTML += message.render;
});
function addService({text}){
  const req=fetch("https://3000-asgaraliyev-vitejsviteb-4uw4lvm9d3h.ws-us98.gitpod.io/messages",{
    method:"POST",
    body:JSON.stringify({
      text
    })
  })

}
chatFormEl.addEventListener("submit",(e)=>{
  const formEl=e.target
  e.preventDefault()
  addService({
    text:formEl.text.value.trim()
  })
  
})