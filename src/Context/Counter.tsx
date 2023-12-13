import React,{createContext, useContext, useState} from "react";

interface CounterProviderProps{
    children:React.ReactNode
}

interface CounterProviderValue{
    count:number;
    setCount:(num:number)=>void;
}

const CounterContext=createContext<CounterProviderValue | null>(null);

export const CounterProvider:React.FC<CounterProviderProps> =(props)=>{
    const [count, setCount] = useState<number>(1)
    return (
        <CounterContext.Provider value={{count,setCount}}>
             {props.children}
        </CounterContext.Provider>
    )
}

export const useCounter=()=>{
    return useContext(CounterContext)
}