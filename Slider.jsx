import { useEffect, useRef, useState } from "react";
import { crousel } from "../../service/api";
import "./slider.css";
import { slider } from "../../assets/data";
import {TbChevronsLeft,TbChevronsRight} from "react-icons/tb";
import {RxDot} from "react-icons/rx";


const widthMax="80";

const sliderOverflow={
        boxSizing: "border-box",
        position: "relative  ",
        height:"70vh",
        width:`${widthMax}vw`,
        top: "18vh",
        overflow: "hidden",
        margin:"0px auto",
        marginBottom:"10vh",
}

const sliderImage={
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition:"center",
    backgroundSize:"cover", 
    boxShadow:" -3px 4px 16px -2px rgba(128,126,128,1)",
}

const sliderContainerStyles={
    boxSizing: "border-box",
    height: "100%",
    display: "flex",
    flexDirection:"row",
    justifyContent: "center",
    transition:"transform ease-in-out 0.6s",
}
export default function Slider(){
 

    const [poster,setPoster]=useState([]);
    const getPoster=async()=>{
        let res=await crousel();
        // console.log(res.data[0].title);
        setPoster(res.data);
    }
    useEffect(()=>{
        // console.log("useffect of slider");  
        getPoster();
    },[]);

    const [currIndex,setCurrIndex]=useState(0);

    const timerRef=useRef(null);

    
    const gotoPrevious=()=>{
        const newSlide=currIndex===0?slider.length-1:currIndex-1;
        setCurrIndex(newSlide);
    }
    const gotoNext=()=>{
        const newSlide=currIndex===slider.length-1?0:currIndex+1;
        setCurrIndex(newSlide);
    }
    useEffect(()=>{
        if(timerRef.current){
            clearTimeout(timerRef.current);
        }
        timerRef.current=setTimeout(()=>{
            gotoNext();
        },5000);
        return ()=>clearTimeout(timerRef.current);
    },[gotoNext])

    const gotoIndex=(index)=>{
        setCurrIndex(index)
    }

    
    // const {vmin, vmax, vw, vh} = useUnits();

    console.log(typeof min);
    const getStyleswithBg=(index)=>({
            ...sliderImage,
            backgroundImage:`url(${slider[index].url})`,
            width:`${widthMax}vw`,
    })

    const sliderContainer=()=>{
        // const min=`${20}vw`;
        return {
        ...sliderContainerStyles,
        width:`${widthMax*slider.length}vw`,
        transform:`translateX(${-(widthMax*currIndex)}vw)`

    }}
    return (
    <div  >
        <div style={sliderOverflow} className="slider-div">
        <div style={sliderContainer()}>
            {slider.map((_,index)=>(
                <div key={index} style={getStyleswithBg(index)}></div>
            ))}
        </div>
        </div>
            <div className="leftArrow">
                <TbChevronsLeft onClick={gotoPrevious}
                className="arrowicon"/>
            </div>
        <div className="rightArrow">
                <TbChevronsRight onClick={gotoNext}className="arrowicon"/>
            </div> 
        <div className="dot-div">
            {
                slider.map(slides=>{
                       return( <RxDot className="doticon" key={slides.id} onClick={()=>gotoIndex(slides.id)}/>)
                })
            }
        </div>
        </div>
    )
}