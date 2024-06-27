import React, { useState, useEffect } from 'react';
import '../../css/products.css';
import ProductShort from '../../components/product/ProductShort';
import WorngRequest from '../WorngRequest';
import { getRequest } from '../../modules/requests/server_requests';
import Loading from '../../components/Loading';
import ProductFilters from '../../components/product/ProductFilters';
import { useSelector, useDispatch } from 'react-redux';


function Products({ products, setProducts }) {
  const [worngRequest, setWorngRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  let token = useSelector((state) => state.app.token);
  let productsRedux = useSelector((state) => state.details.products);
  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchData() {
      try {
       
          if (token === '') {
            token = localStorage.getItem('token');
          }
          if (productsRedux.length == 0) {
          const response = await getRequest(`http://localhost:3000/products/shortList`, token);
          if (response.ok) {
            await dispatch({ type: 'SET_PRODUCTS', payload: response.body });
            await setProducts(response.body);
          } else {
            setWorngRequest(true);
          }
        }
        else {
          await setProducts(productsRedux);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setWorngRequest(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setProducts]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.minPrice >= priceRange[0] && product.maxPrice <= priceRange[1];
        return matchesSearch && matchesPrice;
      });
      setFilteredProducts(filtered);
    }
    filterProducts();
  }, [products, searchQuery, priceRange]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    worngRequest ? <WorngRequest className='wrongRequest' setWorngRequest={setWorngRequest} /> :
      <div>
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedPackage={selectedPackage}
          onPackageChange={handlePackageChange}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceRangeChange}
        />
        {loading ? (
          <Loading />
        ) : (
          <div className="allProducts">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((productData) => (
                <ProductShort status={localStorage.getItem('status')} className="productShort" productData={productData} key={productData.id} />
              ))
            ) : (
              <p>לא נמצאו מוצרים התואמים את החיפוש שלך</p>
            )}
          </div>
        )}
      </div>
  );
}

export default Products;
