import './App.css';

import FileBase from 'react-file-base64';

import { useState } from 'react';
import axios from "axios";

function App() {
  const [listingData, setListingData] = useState("");

  let data64 //init variable

  //console.log(listingData)

  /* Put this Conditional for starting web app o refreshing
   * to avoid errors because initial value is ""
   * initial value:
   * listingData = "" and listingData.selectedFile = undefined
  */

  if (listingData !== "") {
    data64 = listingData.selectedFile.split(',')
    console.log(data64); //data64 = image converted to base64
  }
  

  //Send image to ImgBB with AXIOS
  const handleClick = () => {
    var data = new FormData();
    data.append('image', data64[1])
    //data.append('name', 'prueba01')

    var config = {
      method: 'post',
      url: 'https://api.imgbb.com/1/upload?key=165bc83a2b0f87e5ddc8af943b7fcba4',
      headers: { "Content-Type": "multipart/form-data" },
      data : data
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  return (
    <div className="App">
      <h1>React File to Base64 Converter</h1>

      <div>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setListingData({ ...listingData, selectedFile: base64 })} />
        <button type='button' onClick={() => handleClick()}>Send</button>
      </div>

      {/* show selected image */}
      <img src={data64} alt="" style={{ width: 350 }} />


    </div>
  );
}

export default App;
