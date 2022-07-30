import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS,registerables } from 'chart.js';
ChartJS.register(...registerables);

function CoinPage() {
  const [graphData, setGraphData] = useState([]);
  // const [time, setTime] = useState(true);
  const {id,name} = useParams();
  console.log("id",id,name);
  const getGraph = async()=>{
    const data = await axios.get(`https://jsonkeeper.com/b/DB32`).then((res)=>{
      console.log(res.data);
      return res.data;
    })
    setGraphData(data);
  }
  
  useEffect(() => {
    getGraph();
    console.log("outside timer");
    let timeId = setInterval(()=>{
      console.log("inside timer");
      getGraph();
    },60000);
    return ()=>{
      clearInterval(timeId);
    }
  }, []);
  
  const data = {
    labels: graphData.map((item)=>{
      let date = item.datetime.split('.');
      return date[0];
    }),
    datasets:[{
      label:name,
      data:graphData.map((item)=>{
        return item.price;
      }),
      borderColor:"black",
    }]
  }
  const options = {
    responsive:true,
    elements:{
      point:{
        radius:1
      }
    }
  }
  return (
    <div className='coin-page'>
      <div>
        <Line options={options} data={data}/>
      </div>
    </div>
  )
}

export default CoinPage