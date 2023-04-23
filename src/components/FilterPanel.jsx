import React,{useState, useEffect, useRef} from 'react'

function FilterPanel({categories,input,output}) { 
 const [min,setMin] = useState(1);
 const [max,setMax] = useState(1000);
 const [selectedCat, setSelectedCat] = useState([]);
 const [inStock, setInStock] = useState(false);
 const searchRef = useRef();

 useEffect(()=>{
    if(min>=max){
       setMax(parseInt(min) + 1);     
    }
 },[min])   


 const handleSearch = ()=>{
    let filteredProduct = input;   
    
    if(inStock){
        filteredProduct = filteredProduct.filter(product=>{
            return product.rating.rate > 3
        })
    }

    if(selectedCat.length){
        filteredProduct = filteredProduct.filter((product)=>{
            return selectedCat.includes(product.category)
        })   
    }

    filteredProduct = filteredProduct.filter((product)=>{
        return (product.price >= min && product.price < max) 
    })
    
    filteredProduct = filteredProduct.filter((product)=>{
        if(product.title.toLowerCase().includes(searchRef.current.value) || product.description.toLowerCase().includes(searchRef.current.value))
        return product
    })
    output(filteredProduct);
  }

  return (
    <div className="filter_panel col">
         <div className="row filter_row">
            <div className="search row">
                <input type="text" ref={searchRef} placeholder='Search you products...'/>
            </div>
            <button className="filter_btn btn1" onClick={handleSearch}>Filter</button>
        </div>
        <div className="row filter_row range">
            <div className="range_input row">
                <span>Min</span>
                <strong>{min}</strong>
                <input 
                type="range" 
                min="1" 
                max="100" 
                defaultValue={min} 
                onChange={(e)=>setMin(e.target.value)}/>
            </div>
            <div className="range_input row">
                <span>Max</span>
                <strong>{max}</strong>                
                <input 
                type="range"
                min={min} 
                max="1000" 
                defaultValue={max} 
                onChange={(e)=>{
                    setMax(e.target.value)
                }}/>
            </div>
        </div>
        <div className="row filter_row">
            <div className="tags row">
                 {categories.map((cat,index)=>{

                    return (<span className={selectedCat.includes(cat) ? 'tag selected_tag' : 'tag'}
                                 key={index}
                                 onClick={()=>{
                                    if(selectedCat.includes(cat))
                                    setSelectedCat(selectedCat.filter(item=>item!=cat))
                                    
                                    else
                                    setSelectedCat(current=>[...current,cat])
                                 }}>
                                    {cat}</span>)
                 })}
                 <span className={inStock ? 'tag selected_tag' : 'tag'} onClick={()=>setInStock(!inStock)}>In Stock Products only</span>
            </div>  
        </div>
    </div>
  )
}

export default FilterPanel