import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

const muiTheme = getMuiTheme(darkBaseTheme);

export default muiTheme;
