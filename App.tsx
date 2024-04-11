/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

function App(): React.JSX.Element {
  const [data,setData] = useState({});
  const [pending,setPending] = useState(false);
  const [error,setError] = useState("");

  const loadData = async()=>{
    try{
      setPending(true)
      setError("");
      const res = await fetch('https://animechan.xyz/api/random');
      if(!res.ok){
        throw new Error("Something went wrong 🥲");
      }else{
        const jsonData = await res.json()
        setData(jsonData)
      }
    }catch(err){
      if (typeof err === "string") {
        err.toUpperCase()
        setError(err)
    } else if (err instanceof Error) {
      setError(err.message)
    }
    }finally{
      setPending(false)
    }
  }
  useEffect(()=>{
    if(Object.keys(data).length==0){
      loadData();
    }
  },[data])

  return (
    <View className="bg-green-200 min-h-full " >
      <View className=' flex items-center bg-yellow-300 min-w-full shadow-lg border-2 rounded-b-2xl border-b-blue-500 ' >
      <Text className=' p-10  font-bold text-blue-600 text-2xl  ' >
        Anime Quotes 🖋️
      </Text>
      </View>
      {pending && <View className=" m-3 flex items-center" ><Text className="text-red-500 text-xl " >Pending...</Text></View> }
      {error!="" && <View><Text>Error</Text></View>}
      {Object.keys(data).length!=0 &&  <View className="bg-yellow-300 m-5 p-5 rounded-2xl shadow-2xl " ><Text className='text-black' >Said By : </Text><Text className="text-xl text-blue-500 font-bold " >{data.character}</Text></View>}
      {Object.keys(data).length!=0 &&  <View className="bg-yellow-300 m-5 p-5 rounded-2xl shadow-2xl " ><Text className="text-xl text-black " >{data.quote}</Text></View>}
      {Object.keys(data).length!=0 &&  <View className="bg-yellow-300 m-5 p-5 rounded-2xl shadow-2xl " ><Text className='text-black' >Anime: </Text><Text className="text-xl text-blue-500 font-bold" >{data.anime}</Text></View>}
      <View className="m-10" >
      <Button
      onPress={()=>{setData({})}}
      title="New Quote"
      color="#22c55e"
      accessibilityLabel="Get New Quote" /></View>
    </View>
  );
}

export default App;
