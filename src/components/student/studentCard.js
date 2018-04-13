// @flow

import * as React from 'react';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui-icons/MoreVert';
import PlaceIcon from 'material-ui-icons/Place';
import SchoolIcon from 'material-ui-icons/School';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
//
import './student.css';

// type Props = {
//   title: string,
//   description: string,
//   accepted: string
// };
// type State = {
//   anchorEl: any
// };

//CONSTS
// const TOOLBAR_MENU_OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
// const ITEM_HEIGHT = 48;

// class MyCard extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       anchorEl: null
//     };
//   }
//   handleClick = (event: any) =>
//     this.setState({ anchorEl: event.currentTarget });

//   handleClose = () => this.setState({ anchorEl: null });

//   render() {
//     const { anchorEl } = this.state;
//     return (
// <Card className="cardOne">
//   <CardHeader
//     action={
//       <div className="dd">
//         <IconButton
//           color="inherit"
//           aria-label="More"
//           aria-owns={anchorEl ? 'long-menu' : null}
//           aria-haspopup="true"
//           onClick={this.handleClick}
//         >
//           <MoreVert />
//         </IconButton>
//         <Menu
//           id="long-menu"
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={this.handleClose}
//           PaperProps={{
//             style: {
//               maxHeight: ITEM_HEIGHT * 4.5,
//               width: 200
//             }
//           }}
//         >
//           {TOOLBAR_MENU_OPTIONS.map(option => (
//             <MenuItem key={option} onClick={this.handleClose}>
//               {option}
//             </MenuItem>
//           ))}
//         </Menu>
//       </div>
//     }
//     title={this.props.title}
//   />
//   <CardContent>
//     <Typography component="p">{this.props.description}</Typography>
//   </CardContent>
//   {this.props.accepted === 'false' ? TAKE : ACTIONS}
// </Card>
//     );
//   }
// }

const StudentCard = (props: any) => {
  const take = () => {
    return (
      <div>
        <div className="flex">
          <div className="status">
            <Typography gutterBottom>
              <PlaceIcon />
              {props.location}
            </Typography>
          </div>
          <div className="status">
            <Typography gutterBottom>
              <SchoolIcon />
              {props.lecturer}
            </Typography>
          </div>
        </div>
        <Button color="primary">Записаться</Button>
      </div>
    );
  };

  const actions = () => {
    return (
      <div>
        <p>Test</p>
        {/* <CardActions className={props.classes.cardOne__actions}>
                  <div className={props.classes.status}>
                      <div className={props.classes.check}>
                          <DoneIcon className={props.classes.icon} />
                      </div>
                      <Typography className={props.classes.grey} gutterBottom>
                          Записан
              </Typography>
                  </div>
                  <div className={props.classes.status}>
                      <div className={props.classes.check}>
                          <DoneIcon className={props.classes.icon} />
                      </div>
                      <Typography className={props.classes.grey} gutterBottom>
                          Пришёл
              </Typography>
                  </div>
                  <div className={props.classes.status}>
                      <div className={props.classes.check}>
                          <DoneIcon className={props.classes.icon} />
                      </div>
                      <Typography className={props.classes.grey} gutterBottom>
                          Сдал
              </Typography>
                  </div>
              </CardActions> */}
      </div>
    );
  };

  return (
    <div className="student-card">
      <Card className="cardOne">
        <CardHeader
          action={
            <div className="dd">
              {/* <IconButton
                color="inherit"
                aria-label="More"
                aria-owns={anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                  }
                }}
              >
                {TOOLBAR_MENU_OPTIONS.map(option => (
                  <MenuItem key={option} onClick={this.handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu> */}
            </div>
          }
          title={props.title}
        />
        <CardContent>
          <Typography component="p">{props.description}</Typography>
        </CardContent>
        {/* {props.accepted === 'false' ? take() : actions()} */}
      </Card>
    </div>
  );
};

export default StudentCard;
