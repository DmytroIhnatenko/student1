import { FC, useContext, useEffect, useState } from "react";
import { useTape } from "../../hooks/useTape";
import { tapeTypes } from "../../model/tapeTypes";
import { tapeItem } from "../../model/tapeItem";
import { Alert, Button, Card, Container, Table, Image, Row, Col} from "react-bootstrap";
import { dbContext, tapeContext } from "./App";
import { Photo } from "../../model/Photo";
import { Post } from "../../model/Post";




export const Home: FC = ()=>{

    const db = useContext(dbContext) 
    const [tape, setTape] = useContext(tapeContext);
 

    function showTapeItems(item: {type: tapeTypes, item: tapeItem}, index: number) {
        
        if(item.type === tapeTypes.userCreated){
            return (<>
                <Alert variant="dark">
                    <Alert variant="info">User {item.item} has created an account</Alert>
                    <Table className="mx-auto border border-dark" striped>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>email</th>
                            <th>name</th>
                            <th>userName</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{db.db.users[db.db.users.findIndex(e=>e.email === item.item)].id}</td>
                            <td>{db.db.users[db.db.users.findIndex(e=>e.email === item.item)].email}</td>
                            <td>{db.db.users[db.db.users.findIndex(e=>e.email === item.item)].name}</td>
                            <td>{db.db.users[db.db.users.findIndex(e=>e.email === item.item)].username}</td>
                        </tr>
                    </tbody>
                </Table>
                </Alert>

                
                </>
            )
        }
        else if(item.type === tapeTypes.logedOut){
            return (
                <Alert variant="info">user {item.item} is <Button variant="danger" disabled>offline</Button></Alert>
            )
        }
        else if(item.type === tapeTypes.logedIn){
            return (
                <Alert variant="info">user {item.item} is <Button variant="success" disabled>online</Button></Alert>
            )
        }
        else if(item.type === tapeTypes.addPhoto){
            const photo: Photo = db.db.photos[db.db.photos.findIndex(e=>e.id === item.item)]
            return (
                <Alert variant="dark" style={{maxWidth: "200px"}}>
                    <Alert variant="info">{photo.title}</Alert>
                    <Card style={{ backgroundColor: "#ced4da" }}>
                        <Image src={photo.url} roundedCircle/>
                        <Card.Footer>
                            <small className="text-muted">id: {photo.id} / album id: {photo.albumId}</small>
                        </Card.Footer>
                    </Card>
                </Alert>
            )
        }
        else if(item.type === tapeTypes.deletPhoto){
            const photo: Photo = db.db.photos[db.db.photos.findIndex(e=>e.id === item.item)]
            return (
                <Alert variant="danger">photo by id: {photo.id} was deleted by user</Alert>
            )
        }
        else if(item.type === tapeTypes.addPost){
            const post: Post = db.db.posts[db.db.posts.findIndex(e=>e.id === item.item)]

            return ( 
                <> 
                  <Container> 
                    <Row  > 
                    <Alert variant="info">{db.db.users[db.db.users.findIndex(e=>e.id === post.userId)].email} add post to blog</Alert> 

                        
                        <Col key={post.id} sm={2} className="mt-2" style={{width: "30%" }} > 
                          <Card border="light" className="h-100"> 
                            <Card.Img 
                              style={{ maxHeight: "300px", width: "100%" }} 
                              variant="top" 
                              src={post.image} 
                            /> 
                            
                            <Card.Body> 
                              <Card.Title>{post.title}</Card.Title> 
                              <Card.Text>{post.body}</Card.Text> 
                            </Card.Body> 
                            
                               <Card.Footer>
                           <Button className="d-flex flex-column align-items-center" variant="info" disabled>{db.db.users[db.db.users.findIndex(e=>e.id === post.userId)].email}</Button>

                             
                            </Card.Footer> 
                          </Card> 
                        </Col> 
                      
                    </Row> 
                  </Container>
    </> 
  );

            

            return (
                <Alert variant="dark">
                    <Alert variant="info">{db.db.users[db.db.users.findIndex(e=>e.id === post.userId)].email} add post to blog</Alert>
                    <Card key={post.id} className="mb-2">
                        <Card.Img style={{maxHeight:"200px", width: "100%"}} variant="top" src={post.image} />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                                {post.body}
                            </Card.Text>
                        </Card.Body>
                       
                    </Card>
                </Alert>
            )
        }

        else if(item.type === tapeTypes.deletPost){
            const post: Post = db.db.posts[db.db.posts.findIndex(e=>e.id === item.item)]
            return (
                <Alert variant="danger">post by id: {post.id} was deleted by user</Alert>
            )
        }

        return <></>
        
    }

    
    return <>
    <Container>
        {
            tape.map(showTapeItems)
        }
    </Container>
    </>
}