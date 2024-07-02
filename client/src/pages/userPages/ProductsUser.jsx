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
  const [page, setPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [sortOption, setSortOption] = useState('');
  let token = useSelector((state) => state.app.token);
  let productsRedux = useSelector((state) => state.details.products);
  const dispatch = useDispatch();

  const buildQueryString = () => {
    let queryString = `?page=${page}`;
    if (sortOption) {
      queryString += `&sort=${sortOption}`;
    }
    if (selectedPackage) {
      queryString += `&package=${selectedPackage}`;
    }
    return queryString;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        if (token === '') {
          token = localStorage.getItem('token');
        }
        const queryString = buildQueryString();
        const response = await getRequest(`http://localhost:3000/products/filter${queryString}`, token);
        if (response.ok) {
          const newProducts = response.body;
          if (newProducts.length < 10) {
            setHasMoreProducts(false);
          }
          if (page == 1) {
            await dispatch({ type: 'SET_PRODUCTS', payload: newProducts });
            await setProducts(newProducts);
          } else {
            await setProducts([...productsRedux, ...newProducts]);
          }
        } else {
          setWorngRequest(true);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setWorngRequest(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, sortOption, selectedPackage]);

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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const loadMoreProducts = () => {
    setPage(prevPage => prevPage + 1);
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
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
        {loading ? (
          <Loading />
        ) : (
          <div className="allProducts">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((productData, index) => (
                <ProductShort className="productShort" productData={productData} key={productData.id} />
              ))
            ) : (
              <p>לא נמצאו מוצרים התואמים את החיפוש שלך</p>
            )}
          </div>
        )}
        {hasMoreProducts && !loading && (
          <button className="loadMoreButton" onClick={loadMoreProducts}>
            טען עוד מוצרים
          </button>
        )}
      </div>
  );
}

export default Products;
