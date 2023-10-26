export const checkValidEmail = (email) => {
    if (email !== '') {
       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!regex.test(email)) {
          console.log('Invalid email');
          return false;
       } else {
          return true;
       }
    } else {
       console.log('Unfilled email!');
       return false;
    }
};

export const checkValidPassword = (password) => {
    if (password !== '') {
       if (password.length < 6) {
          console.log('Invalid password');
          return false;
       } else {
          return true;
       }
    } else {
       console.log('Unfilled password');
       return false;
    }
 };

 