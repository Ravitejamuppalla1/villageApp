const Home = (props) => {

    return (
    <div className='container-fluid'>
        <div className='row'>
            <center> <h2 style={{ color: "DarkBlue" }}>Welcome to Home page</h2></center>
            <div className='col-md-6'>
                <h3 style={{ paddingTop: '100px' }}>
                    There is a great good in returning to a landscape that has had extraordinary meaning in one's life.
                    It happens that we return to such places in our minds irresistibly. There are certain villages and
                    towns, mountains and plains that, having seen them walked in them lived in them even for a day,
                    we keep forever in the mind's eye. They become indispensable to our well-being; they define us,
                    and we say, I am who I am because I have been there, or there </h3>
            </div>
            <div className='col-md-4'>
                <img src="https://images.unsplash.com/photo-1564426699369-f14249ac2c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80"
                 alt="village app" style={{ width: "600px", height: "400px" }} />
            </div>
        </div>
    </div>
    
    )
}

export default Home