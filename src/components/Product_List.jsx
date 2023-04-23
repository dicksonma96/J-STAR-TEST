import {useState,useEffect} from 'react'
import Product from './Product'
import FilterPanel from './FilterPanel'

function Product_List() {

    
  const [list,setList] = useState([])
  const [displayList, setDisplayList] = useState([]);
  const [loading,setLoading] = useState(false);
  const [offset,setOffset] = useState(1);
    

  useEffect(()=>{
    getProducts()
  },[])  

  const getProducts = async () =>{
    try{
        setLoading(true);
        const data = await fetch(`https://fakestoreapi.com/products/?limit=${offset * 12}`).then(res=>res.json())
        setList(data);
        setDisplayList(data);
    }
    catch(e){
        alert(e)
    }
    finally{
        setLoading(false);
    }
  }      

  return (
    <div className="products col">
           
        <FilterPanel categories={[...new Set(list.map((item)=>item.category))]} input={list} output={(arr)=>setDisplayList(arr)}/>

        <div className="productScroll">
            <div className="productList">
                {!loading && <>

                    { displayList.length == 0 && <span className="not_found">Product not found :（ </span>} 

                    {displayList?.map((product,index)=>{
                        return(<Product key={index} product={product} />)
                    })}
                    

                </>
                }

                {
                    loading &&
                    <>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                    </>
                }

                


            </div>
        </div>   
        
    </div>
   
  )
}

export default Product_List