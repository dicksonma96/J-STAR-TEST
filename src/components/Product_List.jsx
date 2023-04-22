import {useState,useEffect} from 'react'
import Product from './Product'

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
   
  const handleSearch = (e)=>{
    const filteredProduct = list.filter((product)=>{
        if(product.title.toLowerCase().includes(e.target.value) || product.description.toLowerCase().includes(e.target.value))
        return product
    })
    setDisplayList(filteredProduct);
  }


  return (
    <div className="products col">

        <div className="row filter_section">
            <div className="search row">
                <input type="text" onChange={handleSearch} placeholder='Search you products...'/>
            </div>
            <button className="filter_btn btn1">Filter</button>
        </div>

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