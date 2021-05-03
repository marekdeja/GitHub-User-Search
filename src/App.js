
import { useState } from 'react';
import styles from './App.module.scss';
import { getUsers } from './api';
import { saveUsers } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';


function App() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer);
    const [searchedWord, setSearchedWord] = useState("");
    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)


    const handleSearchChange = (e) => {
        setSearchedWord(e.target.value);
    }

    const handleSumbit = async (event) => {
        if (searchedWord.length > 0) {

            setLoading(true);
            event.preventDefault();
            const fetchData = await getUsers(searchedWord);
            const fiveUsers = fetchData.items.slice(0, 5);
            dispatch(saveUsers(fiveUsers));

            console.log(fiveUsers);
          
            setLoading(false);
        }

    }

    const printResults = () => users.map((user, index) => {

      // return <Person person={person}  key={`key_${index}`}/>
    })


    return (
        <div className={styles.mainContainer}>
            <form className="searchForm" onSubmit={handleSumbit}>
                <input value={searchedWord} onChange={handleSearchChange} placeholder="Enter username"></input>

                <button type="submit" >Search</button>
            </form>

            <div className={styles.results}>
                {!loading && printResults()}{loading&&<div>Loading...</div>}
            </div>
        </div>
    );
}

export default App;
