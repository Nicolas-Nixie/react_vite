import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { firestore } from '../firebase/firebase'
import { Routes , Route, useNavigate, useParams, Link } from 'react-router-dom' 
import { getDocs,getDoc, collection, doc } from "firebase/firestore";
import Menu from '../components/Menu'


const OrderView = () => {
    const { currentUser, signOut } = useContext(AuthContext)
    const [shoes, setShoes] = useState([])
    const navigate = useNavigate()
    const { orderId } = useParams();

    useEffect(() => {
        const fetchShoes = async () => {
            //console.log(orders)
            //setOrders(orders)
            //console.log(element)
            const order = await findOrder(orderId)
            if(order){
                order.shoes.forEach(async (element2: { id: string; }) => {
                    const orderUnit = await findOrderUnit(element2.id)
                    if(orderUnit){
                        const shoe = await findShoe(orderUnit.shoes.shoeReference.id)
                        const test = {"shoe": shoe, "amount": orderUnit.shoes.amount}
                        setShoes(shoes => [...shoes, test])
                    }
                });
            }
        }
    fetchShoes()
  }, [])

  const findOrder = async (id: string) => {
    const doc_ref = await getDoc(doc(firestore, 'order', id))
    return doc_ref.data()
  }

  const findOrderUnit = async (id: string) => {
    const doc_ref = await getDoc(doc(firestore, 'orderUnit', id))
    return doc_ref.data()
  }

  const findShoe = async (id: string) => {
    const doc_ref = await getDoc(doc(firestore, 'shoes', id))
    return doc_ref.data()
  }
  

    return(
        <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 px-2">
                <Menu />
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">  
                    <div id="24h">
                        <h1 className="font-bold py-4 uppercase">Commande : { orderId }</h1>
                        <div id="products" className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            
                        {shoes.map((shoe) =>
                        
                        <div className="bg-black/60 to-white/5 p-6 rounded-lg" key={shoe.id}>
                                <div id="stats-1">
                                    <img src={shoe.shoe.imgUrl}/>
                                </div>
                                <div className="flex flex-row space-x-4 items-center py-5">
                                    
                                    <div>
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Quantité : {shoe.amount}</p>
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">{shoe.shoe.marques}</p>
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">taille : {shoe.shoe.size}</p>
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">prix : {shoe.shoe.price} €</p>
                                        
                                    </div>
                                </div>
                            </div>

                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default OrderView




