export default (i)=>{
    const bin=Math.round(i/255)+1;
    const hex=i%255+1;
    let str=bin.toString(2);
    
	if(str.length===1){
      str='00'+str;
    }else if(str.length===2){
      str='0'+str
    }
    
    const a=str.split('').map(item=>item*hex);

    return [a[0],a[1],a[2]]
}