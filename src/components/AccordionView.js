import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import styles from './AccordionView.module.scss';

export const AccordionView = ({ users }) => {
    const { Panel } = Collapse;

    const printRepos = (repos) => repos.map((repo, index) =>
            <div className={styles.repoContainer} key={`repo_${index}`}>
                <div className={styles.repoBox} >
                    <div className={styles.firstRow}>
                        <div>{repo.name}</div><div>{repo.stargazers_count} &#x2605;</div>
                    </div>
                    <div className={styles.description}>{repo.description}</div>
                </div>
            </div>)
    

    const printPanels = () => users.map((user, index) => <Panel header={user.login} key={index} className={styles.panelAntd}>
        <div>{printRepos(user.repos)}</div>{user.repos.length===0 && <div><b>No repositories</b> </div>}
    </Panel>)

    return (
        <Collapse accordion expandIconPosition="right" bordered={false} ghost>
            {printPanels()}
        </Collapse>
    )
}