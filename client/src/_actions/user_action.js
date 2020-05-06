import axios from 'axios'

// Call at LoginPage.js 29 line
// 30강 6분 25초에서 멈춤
export function loginUser(dataToSubmit) {
    axios.post('/api/user/login', dataToSubmit)
        .then(response => {
            
        });
}