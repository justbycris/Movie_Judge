import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

// RapidAPI: https://rapidapi.com/DataCrawler/api/imdb188/playground/apiendpoint_4a71b2f6-2919-44e6-903f-450c3792fbab

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", async (req,res) => {

  const apiRequests = [ 
    {
      method: 'GET',
      url: 'https://imdb188.p.rapidapi.com/api/v1/getWeekTop10',
      headers: {
          'x-rapidapi-key': 'c6f577a5c4mshbb9456c28c38a94p128e9djsn88e3061e0d99',
          'x-rapidapi-host': 'imdb188.p.rapidapi.com'
        }
    }, 
    {
      method: 'GET',
      url: 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites',
      params: {country: 'US'},
      headers: {
        'x-rapidapi-key': 'c6f577a5c4mshbb9456c28c38a94p128e9djsn88e3061e0d99',
        'x-rapidapi-host': 'imdb188.p.rapidapi.com'
    }
  }
];

  Promise.all(apiRequests.map(request => axios.request(request)))
    .then(responses=> {
      const result = responses.map(response => response.data);
      res.render('index.ejs', {result: result})
    })
    .catch(error => {
      // If any request fails, handle the error here
      console.error('An error occurred:', error);
  });
  
});






// app.get("/", async (req,res) => {

//   const options = {
//     method: 'GET',
//     url: 'https://imdb188.p.rapidapi.com/api/v1/getWeekTop10',
//     headers: {
//       'x-rapidapi-key': 'c6f577a5c4mshbb9456c28c38a94p128e9djsn88e3061e0d99',
//       'x-rapidapi-host': 'imdb188.p.rapidapi.com'
//     }
//   };
  
//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//     // const result = response.data.data[0].originalTitleText.text;
//     res.render('index.ejs', { result: response.data })
//   } catch (error) {
//     console.error(error);
//   }
  
// });



app.listen(port, () => {
    console.log('Server is running on port 3000')
})