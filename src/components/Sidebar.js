import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

function Sidebar({ items }) {
    return (
        <div className="sidebar">
            <List disablePadding dense>
                {items.map(({ label, name, items: subItems, rootpath, filename, ...rest }) => {
                    return (
                        <React.Fragment key={name}>  
                            {rootpath ?
                                (<Link to={"/full-stack-interview-questions/" + rootpath + "/" + filename} style={{ textDecoration: 'none' }} >
                                    <ListItem style={{ paddingLeft: 18 }} button {...rest}>
                                        <ListItemText>{label}</ListItemText>
                                    </ListItem>
                                </Link>) :
                                (
                                    <ListItem style={{ paddingLeft: 18 }} button {...rest}>
                                        <ListItemText>{label}</ListItemText>
                                    </ListItem>
                                )}
                            {Array.isArray(subItems) ? (
                                <List disablePadding dense>
                                    {subItems.map((subItem) => {
                                        return (
                                            <Link to= {"/full-stack-interview-questions/" + subItem.rootpath + "/" + subItem.filename}  style={{ textDecoration: 'none' }} >
                                                <ListItem
                                                    key={subItem.name}
                                                    style={{ paddingLeft: 36 }}
                                                    button
                                                    dense
                                                >
                                                    <ListItemText>
                                                        <span className="sidebar-subitem-text">
                                                            {subItem.label}
                                                        </span>
                                                    </ListItemText>

                                                </ListItem>
                                            </Link>                                            
                                        )
                                    })}
                                </List>
                            ) : null}
                        </React.Fragment>
                    )
                })}
            </List>
        </div>
    )
  }

export default Sidebar
