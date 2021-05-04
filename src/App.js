import { useState } from 'react';
import styles from './App.module.scss';
import { getUserRepos, getUsers } from './api';
import { saveUsers } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AccordionView } from './components/AccordionView';


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
            const fiveElementsWithRepos=[]
            for (let i =0; i<fiveUsers.length; i++){
                const user = fiveUsers[i]
                const fetchRepos = await getUserRepos(user.repos_url);
                user.repos = fetchRepos;
                fiveElementsWithRepos.push(user)
            }
            dispatch(saveUsers(fiveElementsWithRepos));
            setLoading(false);

        }
    }

return (
    <div className={styles.mainContainer}>
        <form className="searchForm" onSubmit={handleSumbit}>
            <input value={searchedWord} onChange={handleSearchChange} placeholder="Enter username"></input>

            <button type="submit" >Search</button>
        </form>

        <div className={styles.results}>
            {searchedWord && <div>Showing users for <i>{searchedWord}</i>:</div>}
            {!loading && <AccordionView users={users} />}{loading && <div><br/>Loading...</div>}
        </div>
    </div>
);
}

export default App;
