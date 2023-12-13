import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";

class Tag extends Component{

    render(){
        const {text, tagId, username} = this.props;

        return(
            <div>
                <Nav.Item>
                <Nav.Link
                href={`/knowledge-share/${username}/tags/${tagId}`}
                >
                  <span className="badge bg-dark mx-1">{text}</span>
                </Nav.Link>
              </Nav.Item>
            </div>
        );
    }
}

export default Tag;