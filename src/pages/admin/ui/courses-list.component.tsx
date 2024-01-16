import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import useAllCourses from "@/hooks/all-courses.hook";
import CourseComponent from "./course.component";
import { ChangeEvent, useState } from "react";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { inPlaceSort } from "fast-sort";
import { ICourse } from "@/models/class.model";

interface Props {}

const CourseListComponent: React.FC<Props> = () => {
  const { courses } = useAllCourses();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("");
  const [currentFilterAttribute, setCurrentFilterAttribute] = useState("1");

  const handlePageChange = (
    event: ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPageNumber(pageNumber);
  };

  const handleChangeAttribute = (target: HTMLSelectElement) => {
    setCurrentFilterAttribute(target.value);
    setCurrentFilter("");
  };

  const filterFunction = (element: ICourse) => {
    switch (currentFilterAttribute) {
      case "1":
        if (
          element?.name.toUpperCase().indexOf(currentFilter.toUpperCase()) > -1
        ) {
          return true;
        }
        break;
      case "2":
        if (
          element?.description
            .toUpperCase()
            .indexOf(currentFilter.toUpperCase()) > -1
        ) {
          return true;
        }
        break;
      case "3":
        if (
          element?.courseOwner.name
            .toUpperCase()
            .indexOf(currentFilter.toUpperCase()) > -1
        ) {
          return true;
        }
        break;
      case "4":
        if (
          element?.inviteCode
            .toUpperCase()
            .indexOf(currentFilter.toUpperCase()) > -1
        ) {
          return true;
        }
        break;
      default:
        break;
    }
    return false;
  };

  const coursesPagination =
    courses?.filter(filterFunction).length > 8
      ? courses
          ?.filter(filterFunction)
          .slice((currentPageNumber - 1) * 8, currentPageNumber * 8)
      : courses?.filter(filterFunction);

  const handleFilterChange = (event: ChangeEvent<unknown>) => {
    setCurrentFilter((event.target as HTMLInputElement).value);
  };

  const [sortName, setSortName] = useState(false);
  const [sortDescription, setSortDescription] = useState(false);
  const [sortCourseOwner, setSortCourseOwner] = useState(false);
  const [sortInviteCode, setSortInviteCode] = useState(false);

  const handleSortClick = (attribute: string, state: boolean) => {
    if (!state) {
      switch (attribute) {
        case "name":
          inPlaceSort(courses).asc([(course) => course.name]);
          setSortName(true);
          break;
        case "description":
          inPlaceSort(courses).asc([(course) => course.description]);
          setSortDescription(true);
          break;
        case "courseOwner":
          inPlaceSort(courses).asc([(course) => course.courseOwner.name]);
          setSortCourseOwner(true);
          break;
        case "inviteCode":
          inPlaceSort(courses).asc([(course) => course.inviteCode]);
          setSortInviteCode(true);
          break;
        default:
          break;
      }
    } else {
      switch (attribute) {
        case "name":
          inPlaceSort(courses).desc([(course) => course.name]);
          setSortName(false);
          break;
        case "description":
          inPlaceSort(courses).desc([(course) => course.description]);
          setSortDescription(false);
          break;
        case "courseOwner":
          inPlaceSort(courses).desc([(course) => course.courseOwner.name]);
          setSortCourseOwner(false);
          break;
        case "inviteCode":
          inPlaceSort(courses).desc([(course) => course.inviteCode]);
          setSortInviteCode(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 10 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <TextField
          id="filter-text-box"
          label="Tìm kiếm"
          type="search"
          value={currentFilter}
          onInput={(event) => handleFilterChange(event)}
          sx={{ width: "400px", mb: 2 }}
        />
        <Select
          sx={{ mb: 2 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentFilterAttribute}
          onChange={(event) =>
            handleChangeAttribute(event.target as HTMLSelectElement)
          }
        >
          <MenuItem value={"1"}>Lớp học</MenuItem>
          <MenuItem value={"2"}>Mô tả</MenuItem>
          <MenuItem value={"3"}>Người tạo</MenuItem>
          <MenuItem value={"4"}>Mã mời</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(95,99,104)",
          paddingBottom: 1,
        }}
      >
        <Grid container>
          <Grid xs={3} item>
            <Stack direction={"row"}>
              <Typography
                variant="h6"
                sx={{ marginLeft: 1, color: "rgb(25,103,210)" }}
              >
                {`Tên môn học`}
              </Typography>
              <IconButton
                onClick={() => handleSortClick("name", sortName)}
                sx={{ mt: "-4px" }}
              >
                <SortByAlphaIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid xs={3} item>
            <Stack direction={"row"}>
              <Typography
                variant="h6"
                sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
              >
                {`Mô tả`}
              </Typography>
              <IconButton
                onClick={() => handleSortClick("description", sortDescription)}
                sx={{ mt: "-4px" }}
              >
                <SortByAlphaIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid xs={3} item>
            <Stack direction={"row"}>
              <Typography
                variant="h6"
                sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
              >
                {`Người tạo`}
              </Typography>
              <IconButton
                onClick={() => handleSortClick("courseOwner", sortCourseOwner)}
                sx={{ mt: "-4px" }}
              >
                <SortByAlphaIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid xs={3} item>
            <Stack direction={"row"}>
              <Typography
                variant="h6"
                sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
              >
                {`Mã mời`}
              </Typography>
              <IconButton
                onClick={() => handleSortClick("inviteCode", sortInviteCode)}
                sx={{ mt: "-4px" }}
              >
                <SortByAlphaIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper", minHeight: 400 }}>
        {courses &&
          coursesPagination.map((course) => {
            return <CourseComponent course={course} key={course.id} />;
          })}
      </List>
      {courses && (
        <Stack alignItems="center">
          <Pagination
            count={Math.ceil(courses?.filter(filterFunction).length / 8)}
            color="primary"
            onChange={(event, pageNumber) =>
              handlePageChange(event, pageNumber)
            }
          />
        </Stack>
      )}
    </Box>
  );
};

export default CourseListComponent;
