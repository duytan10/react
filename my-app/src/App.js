import "./App.scss";
import Accordion from "./components/react-composition/Accordion";

function App() {
    return (
        <div className="p-10 w-full max-w-[600px] mx-auto">
            <Accordion header={"Can i change my content"}>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero nobis distinctio eos dolorum adipisci quisquam quod,
                    repudiandae deleniti iste numquam suscipit, id, explicabo doloremque consequuntur. Pariatur, impedit assumenda. Placeat.
                </div>
            </Accordion>
            <Accordion header={"Can I love"}>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium fugiat voluptatum deleniti error incidunt rem sunt expedita
                    id accusantium architecto non dolor commodi eum excepturi quae voluptates at, dignissimos corporis?
                </div>
            </Accordion>
        </div>
    );
}

export default App;
