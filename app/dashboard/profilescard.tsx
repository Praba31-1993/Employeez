import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Outlinebutton from "../reusableComponent/outlinebtn";
import { Colors } from "../reusableComponent/styles";
import Button from "@mui/material/Button";
import Menulistitem from "../reusableComponent/menulist";

export default function ProfilesCard() {
	const useColors = Colors();

	const arrayList = ["A", "B", "C", "D", "E", "F"];

	return (
		<>
			<div className="flex justify-content-between pb-2">
				<Menulistitem />
				<div className="d-flex align-items-center pe-5">
					<p className="mb-0 textheader pe-3">Supervisor</p>
					<Outlinebutton
						color={useColors.white}
						border={`1px solid ${useColors.themeRed}`}
						text="Punch in"
						fontSize="12px"
						background={useColors.themeRed}
						isDashboardIcon={true} />

				</div>
			</div>
			<div className="row p-0">
				{arrayList?.map((list: any) => (
					<div className="col">
						<div className="d-flex gap-2 align-items-center">
							<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
							<div>34</div>
						</div>
						<div>John Kumar</div>
					</div>
				))}
			</div>
		</>
	);
}
