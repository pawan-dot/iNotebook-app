

import Notes from './Notes'
const Home = (props) => {//srtalert is comming from props 
    const { showAlert } = props;

    return (
        <div>
            <Notes showAlert={showAlert} />
            {/* <h1>jdnjnvujehngujhngtujn</h1> */}
        </div>

    )
}

export default Home;
