import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { firestore } from '../firebase/firebase'
import { getDocs, collection } from "firebase/firestore";

const Profile = () => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [shoes, setshoes] = useState([])

  const collection_name = "shoes"

  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true)
      const shoes = await findAll()
      setshoes(shoes)
      setLoading(false)
    }
    fetchShoes()
  }, [])

  //charger les données de la collection shoes
  const findAll = async () => {
    const doc_refs = await getDocs(collection(firestore, collection_name))
    const res: { id: string; }[] = []
    doc_refs.forEach(shoe => {
        res.push({
            id: shoe.id,
            ...shoe.data()
        }) 
    })
   // console.log(res)
    return res
  }
  //console.log(shoes)
  return(
    
    /**
    * Extract the currrentUser from the context, if you want to
    * get the User info, like the email, display name, etc.
    * <h3>Welcome! {currentUser?.email}</h3>
    */
    <div>
      <h1>Commande</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {shoes.map(shoe => (
        <button className='btn m-3' key={shoe.id} >marque : {shoe.marques} </button>
        ))}
      <p>Sign In Status: {currentUser && 'active'}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
export default Profile