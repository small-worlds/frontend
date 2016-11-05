import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";


var palette = lightBaseTheme.palette;

// BACKGROUND COLORS //
palette.canvasColor = "#fff";

// PRIMARY COLORS //
palette.primary1Color = "#281d62";
palette.primary2Color = "#140445";

// ACCENT COLORS //
palette.accent1Color = "#ee4036";
palette.pickerHeaderColor = "#281d62";

// TEXT COLORS //
palette.alternateTextColor = "#fff";


const muiTheme = getMuiTheme(lightBaseTheme);
export default muiTheme;
