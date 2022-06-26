export default function TikTak(props) {

    const deg = 6  //360 градусов / 60 минут или секунд
    const h = props.time.slice(0,2) * 30
    const m = props.time.slice(3,5) * deg
    const s = props.time.slice(6,8) * deg

    return (
        <div className="analog-clock">
            <div className="hour">
                <div class="hr" id="hr" style={{transform: `rotateZ(${(h) + (m/12)}deg)` }}></div>
            </div>
            <div className="min">
                <div class="mn" id="mn"  style={{transform: `rotateZ(${m}deg)` }}></div>
            </div>
            <div className="sec">
                <div class="sc" id="sc" style={{transform: `rotateZ(${s}deg)` }}></div>
            </div>
        </div>
    )
}
