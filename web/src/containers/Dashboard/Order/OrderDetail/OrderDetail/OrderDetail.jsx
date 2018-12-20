import React from 'react';
import { Icon } from 'react-onsenui';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

import { removeOrder } from '../../../../../redux/actions/orderActions';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	list: {
		padding: 0
	},
	list2: {
		padding: 6
	}
});

class OrderDetail extends React.Component {
	state = {
		open: true,
		visible: false,
		downloadURLs: []
	};

	viewImage = () => {
		this.setState({
			visible: true
		});
	};
	cancelViewImage = () => {
		this.setState({
			visible: false
		});
	};

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	deleteOrder = () => {
		const idItem = this.props.match.params.id;
		this.props.removeOrder(idItem);
		this.props.history.push('/order');
	};

	deleteArrayImage = index => {
		const { downloadURLs } = this.state;
		downloadURLs.slice(index, 1);
		this.set({
			downloadURLs
		});
	};
	deleteUploadedImage = url => {
		// Create a reference to the file to delete
		var desertRef = firebase.storage().refFromURL(url);

		// Delete the file
		desertRef
			.delete()
			.then(function(res) {
				console.log(res, 'Waw Sukses');
				this.deleteArrayImage();
			})
			.catch(function(error) {
				console.log(error, 'Wadidaw Error');
			});
	};

	backPage = () => {
		this.props.history.push('/order');
	};

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		const { order, classes } = this.props;

		if (order) {
			return (
				<div style={{ backgroundColor: '#e7e7e7' }}>
					<div style={{ flex: 1 }}>
						<AppBar
							style={{ width: '100%', backgroundColor: '#333c4e' }}
							position="static"
						>
							<Toolbar>
								<IconButton
									onClick={this.backPage}
									className={classes.menuButton}
									color="inherit"
									aria-label="Menu"
								>
									<ArrowLeft />
								</IconButton>
								<Typography
									variant="h6"
									color="inherit"
									className={classes.grow}
								>
									Detail
								</Typography>
							</Toolbar>
						</AppBar>
					</div>
					<div
						style={{
							height: '100%',

							backgroundColor: '#ffffff',
							width: '100%',
							marginBottom: '25%'
						}}
					>
						<div style={{ textAlign: 'center' }}>
							<Button
								style={{
									backgroundColor: '#f43c3c',
									width: '90%',
									textAlign: 'center',
									color: '#ffffff',
									marginTop: '5%'
								}}
								onClick={this.props.pushPage}
							>
								Edit
							</Button>
						</div>
						<List style={{ overflow: 'hidden' }}>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText
										style={{ float: 'left' }}
										secondary="Nama Pengorder"
									/>
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={order.logs.name ? order.logs.name : ''}
									/>
								</ListItem>
							</List>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Alamat" />
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={order.location.alamat ? order.location.alamat : ''}
									/>
								</ListItem>
							</List>
							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText
										style={{ float: 'left' }}
										secondary="Nomor Telepon"
									/>
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={order.logs.phone ? order.logs.phone : ''}
									/>
								</ListItem>
							</List>

							<List className={classes.list} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Catatan" />
								</ListItem>
								<ListItem style={{ paddingTop: 0 }}>
									<ListItemText
										style={{ float: 'left' }}
										primary={
											order.location.catatan ? order.location.catatan : ''
										}
									/>
								</ListItem>
							</List>
							<List className={classes.list2} onClick={this.handleClickOpen}>
								<ListItem button onClick={this.handleClickOpen}>
									<ListItemText style={{ float: 'left' }} secondary="Foto :" />
								</ListItem>
								<div>
									{order.foto !== null || order.foto !== [] ? (
										order.foto.map((foto, i) => {
											return (
												<div>
													<Grid container spacing={24}>
														<Grid item xs={12} align="center">
															<img
																onClick={this.viewImage}
																src={foto}
																alt="preview failed"
																key={i}
																width="250"
																height="250"
																style={{ display: 'block', margin: '20px' }}
															/>
														</Grid>
													</Grid>

													<Viewer
														visible={this.state.visible}
														onClose={this.cancelViewImage}
														images={[
															{
																src: foto,
																alt: ''
															}
														]}
													/>
													<div style={{ textAlign: 'center' }}>
														<Fab
															size="small"
															color="secondary"
															aria-label="Add"
															onClick={() => this.deleteUploadedImage(foto)}
															style={{ backgroundColor: 'red' }}
														>
															<CloseIcon />
														</Fab>
													</div>
												</div>
											);
										})
									) : (
										<div style={{ textAlign: 'center' }}>Tidak Ada Foto</div>
									)}
									<br />
									<br />
									<br />
								</div>
							</List>
						</List>

						<div
							style={{
								textAlign: 'center',
								bottom: 10,

								width: '100%'
							}}
						>
							<Button
								style={{
									backgroundColor: '#f43c3c',
									width: '90%',
									textAlign: 'center',
									color: '#ffffff'
								}}
								onClick={this.deleteOrder}
							>
								Batalkan Pemesanan
							</Button>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						height: '100%',
						position: 'relative',
						top: 'calc(50% - 10px)'
					}}
				>
					<Icon size={35} spin={true} icon="ion-load-d" />
					<br />
					Loading
				</div>
			);
		}
	}
}

OrderDetail.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const orders = state.firestore.data.orders;
	const order = orders ? orders[id] : null;
	return {
		order: order
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeOrder: id => dispatch(removeOrder(id))
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect([{ collection: 'orders' }])
)(withStyles(styles)(withRouter(OrderDetail)));
