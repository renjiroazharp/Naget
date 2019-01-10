import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import DropTrash from '../../../assets/img/webp/DropTrash.webp';
import TrashScale from '../../../assets/img/webp/TrashScale.webp';
import TrashDrop from '../../../assets/img/webp/TrashDrop.webp';
import TrashBag from '../../../assets/img/webp/TrashBag.webp';
import TrashPoints from '../../../assets/img/webp/TrashPoints.webp';
import LazyLoad from 'react-lazy-load';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './style/carousel.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const themeMui = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	overrides: {
		typography: {
			useNextVariants: true
		},
		MuiMobileStepper: {
			root: {
				'&$dotActive': {
					backgroundColor: '#00c43e',
					color: '#00c43e'
				}
			},
			dotActive: {
				backgroundColor: '#00c43e',
				color: '#00c43e'
			}
		},
		step: {
			'& $completed': {
				color: 'lightgreen'
			},
			'& $active': {
				color: 'pink'
			},
			'& $disabled': {
				color: 'red'
			}
		},
		alternativeLabel: {},
		active: {}, //needed so that the &$active tag works
		completed: {},
		disabled: {},
		labelContainer: {
			'& $alternativeLabel': {
				marginTop: 0
			}
		}
	}
});

const tutorialSteps = [
	{
		imgPath: `${DropTrash}`
	},
	{
		imgPath: `${TrashScale}`
	},
	{
		imgPath: `${TrashDrop}`
	},
	{
		imgPath: `${TrashBag}`
	},
	{
		imgPath: `${TrashPoints}`
	}
];

const styles = theme => ({
	root: {
		width: '100%',
		flexGrow: 1
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing.unit * 4,
		backgroundColor: theme.palette.background.default
	},
	img: {
		height: 200,
		display: 'block',
		maxWidth: 200,
		overflow: 'hidden',
		width: '100%'
	},
	dot: {
		color: 'red',
		backgroundColor: 'blue'
	}
});

class Carousel extends React.Component {
	state = {
		activeStep: 0
	};

	handleNext = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep - 1
		}));
	};

	handleStepChange = activeStep => {
		this.setState({ activeStep });
	};

	handleTypographyDep = () =>
		(window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true);

	componentDidMount() {
		this.handleTypographyDep();
	}

	render() {
		const { classes, theme } = this.props;
		const { activeStep } = this.state;
		const maxSteps = tutorialSteps.length;

		return (
			<div className={classes.root}>
				<center>
					<AutoPlaySwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={activeStep}
						onChangeIndex={this.handleStepChange}
						enableMouseEvents
					>
						{tutorialSteps.map((step, index) => (
							<div key={index}>
								{Math.abs(activeStep - index) <= 2 ? (
									<LazyLoad
										placeholder={<div>Loading</div>}
										debounce={true}
										height="100%"
										width="100%"
									>
										<img
											id="image-carousel"
											className={classes.img}
											src={step.imgPath}
											key={index}
											alt={step.label}
										/>
									</LazyLoad>
								) : null}
							</div>
						))}
					</AutoPlaySwipeableViews>
				</center>
				<MuiThemeProvider theme={themeMui}>
					<MobileStepper
						steps={maxSteps}
						position="static"
						LinearProgressProps={{
							dotActive: classes.dot
						}}
						activeStep={activeStep}
						className={classes.mobileStepper}
						style={{ backgroundColor: 'transparent' }}
						nextButton={
							<Button
								varian="contained"
								size="small"
								onClick={this.handleNext}
								disabled={activeStep === maxSteps - 1}
							>
								{''}
							</Button>
						}
						backButton={
							<Button
								varian="contained"
								size="small"
								onClick={this.handleBack}
								disabled={activeStep === 0}
							>
								{''}
							</Button>
						}
					/>
				</MuiThemeProvider>
			</div>
		);
	}
}

Carousel.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Carousel);
