import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

//console.log(darkBaseTheme.palette);
var palette = darkBaseTheme.palette;

// BACKGROUND COLORS //
//palette.canvasColor = "#303030";

// PRIMARY COLORS //
palette.primary1Color = "#1976D2";
palette.primary2Color = "#1976D2";
//palette.primary3Color = "#140445";

// ACCENT COLORS //
//palette.accent1Color = "#ee4036";
//palette.accent2Color = "#ee4036";
//palette.pickerHeaderColor = "#281d62";

// TEXT COLORS //
//palette.alternateTextColor = "#fff";


const muiTheme = getMuiTheme(darkBaseTheme);
export default muiTheme;
