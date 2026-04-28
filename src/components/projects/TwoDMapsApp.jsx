import ProjectPage from '../ProjectPage.jsx'
import data from '../../data/twodmaps.js'

export default function TwoDMapsApp() {
  return (
    <>
      <ProjectPage {...data} maxColumns={2} />
    </>
  )
}
