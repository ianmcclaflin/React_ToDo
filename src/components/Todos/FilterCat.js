import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function FilterCat(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:61463/api/todo').then(response => {
            setCategories(response.data);
        })    
    }, []);

    return (
    <div className="text-center mt-5">
        <button onClick={() => props.setFilter(0)} className="btn btn-outline-info bg-dark m-1">
            All
        </button>
        {/* Map all of the categories to a button that will be used to filter resources on that category */}
        {categories.map(cat =>
            <button key={cat.CategoryId} onClick={() => props.setFilter(Number(cat.CategoryId))} className="btn btn-outline-info bg-dark m-1">
                {cat.CategoryName}
            </button>    
        )}
    </div>
  )
}
