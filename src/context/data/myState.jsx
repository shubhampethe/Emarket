import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Toast } from 'bootstrap';
import { useNavigate } from "react-router-dom";
function MyState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("all fields are required")
        }

        setLoading(true)

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products)
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        // setProducts("")


    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });

                });
                setProduct(productArray);
                setLoading(false)
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getProductData();
    }, []);


    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'products', products.id), products)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // delete product

    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success('Product Deleted successfully')
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "order"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getOrderData();
    }, []);

    // const [cart,setCart]=useState([]);
    // const Addcart=async()=>{
    //     try {
    //         const productRef = collection(fireDB, 'cart');
    //         await addDoc(productRef, cartItem.id)
    //         toast.success("Add product successfully");
    //         setTimeout(() => {
    //             window.location.href = '/dashboard'
    //         }, 800);
    //         getProductData();
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false)
    //     }
    // }


    // add to cart


    function getUserId() {
        const [id, setId] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setId(user.uid);
                } else {
                    console.log("Not in the loo=gg")
                }
            })
        }, [])
        return id;
    }

    const id = getUserId();

    // const addToCart = async (item) => {

    //     if (id !== null) {
    //         Product = item;
    //         console.log(id);
    //         console.log(item);
    //         console.log(item.id)
    //         Product['qty'] = 1;
    //         Product['total'] = Product.qty * Product.price;
    //         // const safeItemId = encodeURIComponent(item.id);
    //         // fireDB.collection("Cart"+id).doc(item.id).set(Product).then(()=>
    //         // toast.success("Added to cart"))
    //         const productRef = collection(fireDB, "Cart" + id)
    //         const productDocRef = doc(productRef, item.id);
    //         await addDoc(productDocRef, Product)
    //     } else {
    //         // window.location.href = "/login";
    //         console.log(item)

    //     }
    // }



    const addToCart = async (item) => {
        console.log(item)

        if (id !== null) {
            console.log("id is"+id)
            try {
            console.log("try")
            const productRef = collection(fireDB, "Cart" + id);
            const productDocRef = doc(productRef, item.id);
            const productSnapshot = await getDoc(productDocRef);

            if (productSnapshot.exists()) {
                // If the product already exists in the cart, update its quantity and total
                const existingProductData = productSnapshot.data();
                const updatedQuantity = existingProductData.qty + 1;
                const updatedTotal = updatedQuantity * item.price;

                await updateDoc(productDocRef, {
                    qty: updatedQuantity,
                    total: updatedTotal
                });
                console.log("exist")
            } else {
                // If the product is not in the cart, add it with quantity 1
                const newProduct = {
                    ...item,
                    qty: 1,
                    total: item.price
                };

                console.log("not")
                await setDoc(productDocRef, newProduct);
            }

            console.log("Added to cart:", item);
            toast.success("Added to cart:", item)
            } catch (error) {
            console.log(item)
            console.error("Error adding to cart:", error);
            }
        } else {
            // Redirect to the login page if user is not logged in
            window.location.href = "/login";
            console.log("User not logged in");
        }
    }

    // const [cartProuct,setCartProduct]=useState([]);
    // const getCart=async()=>{
    //     setLoading(true)
    //     try {
    //         const q = query(
    //             collection(fireDB, 'Cart'+id),
    //             orderBy('time')
    //         );

    //         const data = onSnapshot(q, (QuerySnapshot) => {
    //             let cartArray = [];
    //             QuerySnapshot.forEach((doc) => {
    //                 cartArray.push({ ...doc.data(), ID: doc.id });
    //                 console.log(cartArray)   

    //             });
    //             setCartProduct(cartArray);
    //             setLoading(false)
    //         });
    //         console.log(data)
    //         return () => data;

    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //    getCart();
    // }, []);


    const [cartProuct, setCartProduct] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userId = user.uid; // Get the user ID

                const q = query(
                    collection(fireDB, 'Cart' + userId),
                    orderBy('time')
                );

                const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
                    const newProduct = querySnapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProduct(newProduct);
                });

                return () => unsubscribeSnapshot(); // Unsubscribe when component unmounts
            }
        });

        return () => unsubscribe(); // Unsubscribe when component unmounts or user changes
    }, []);




    const [user, setUser] = useState([]);
    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);


    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product, setProduct, edithandle, updateProduct, deleteProduct, order, addToCart, cartProuct, id, user, searchkey, filterPrice, filterType, setSearchkey, setFilterPrice, setFilterType
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState