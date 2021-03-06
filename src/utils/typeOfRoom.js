//export icon
export function roomIcon(typeOfRoom) {
  if (typeOfRoom === "normal") return "🏃‍♀️";
  else if (typeOfRoom === "water") return "🏄‍♂️";
}

//export background color for chickens
export function roomChicken(typeOfRoom) {
  if (typeOfRoom === "normal") {
    return `background-color: #888481`;
  } else if (typeOfRoom === "water") {
    return `background-color: #5c5c5c`;
  }
}
//export background color for "" - floor
export function roomFloor(typeOfRoom) {
  if (typeOfRoom === "normal") {
    return `background-color: #888481`;
  } else if (typeOfRoom === "water") {
    return `background-color: #3f88f6`;
  }
}
//export background color for wall
export function roomWall(typeOfRoom) {
  if (typeOfRoom === "normal") {
    return `position: relative;
      background-color: #ddcbbe;

      &:before {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: #985040;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      &:after {
        content: '';
        position: absolute;
        background-color: #ddcbbe;
        height: 3px;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
      }
      `;
  } else if (typeOfRoom === "water") {
    return `
    
    background-color: #EDC9AF;

    &::before {
      content: '';
      background-color: #54a13f;
      position: absolute;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }

    &::after {
      content: '';
      position: absolute;
      background-color: #ac7f4e;
      width: 8px;
      height: 20px;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    `;
  }
}

export function roomDoor(typeOfRoom) {
  if (typeOfRoom === "normal") {
    return `
        background-color: brown;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          width: 40px;
          height: 40px;
          background-color: black;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `;
  } else if (typeOfRoom === "water") {
    return `background-color: #3f88f6`;
  }
}
