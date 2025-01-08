"use client"; 
import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import * as THREE from "three";
import { MathUtils } from "three";


let scene, camera, renderer, pyramidPoints;
let initialized = false;


const normalRotationSpeed = 0.005;    
const slowRotationSpeed = 0.0005;     
const minScale = 1;                   
const maxScale = 10;                  

const _updateFunctions = [];

let isGrowing = false;
let isShrinking = false;

export default function OrbScene() {
  const canvasRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      initThreeScene();
      animate();
    }

    function onWindowResize() {
      if (renderer && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  
  useEffect(() => {
    if (!canvasRef.current) return;

    if (pathname === "/") {
  
      isGrowing = false;
      isShrinking = true;



    } else {

  
      isGrowing = true;
      isShrinking = false;
    }
  }, [pathname]);


  function initThreeScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    
    const detailLevel = 20;
    const geometry = new THREE.TetrahedronGeometry(2, detailLevel);
    geometry.computeBoundingBox();

    const positions = geometry.attributes.position.array;
    const colors = new Float32Array(positions.length);
    const outerColors = new Float32Array(positions.length);
    const color = new THREE.Color();

    
    const colorStart = new THREE.Color(0x00ff7f);      
    const colorEnd = new THREE.Color(0x1e90ff);        
    const colorStartOuter = new THREE.Color(0xda70d6); 
    const colorEndOuter = new THREE.Color(0x8a2be2);   

    // For gradient logic
    const minPos = geometry.boundingBox.min;
    const maxPos = geometry.boundingBox.max;
    const vectorRange = new THREE.Vector3().subVectors(maxPos, minPos);

    // Generate colors
    for (let i = 0; i < positions.length; i += 3) {
      const position = new THREE.Vector3(
        positions[i], positions[i + 1], positions[i + 2]
      );
      const vectorToMin = new THREE.Vector3().subVectors(position, minPos);
      const t = vectorToMin.length() / vectorRange.length();

      // Inner gradient
      color.copy(colorStart).lerp(colorEnd, t);
      colors[i] = color.r; 
      colors[i + 1] = color.g; 
      colors[i + 2] = color.b;

      // Outer gradient
      color.copy(colorStartOuter).lerp(colorEndOuter, t);
      outerColors[i] = color.r; 
      outerColors[i + 1] = color.g; 
      outerColors[i + 2] = color.b;
    }

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const pointMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
    });

    pyramidPoints = new THREE.Points(geometry, pointMaterial);
    scene.add(pyramidPoints);

    
    pyramidPoints.scale.set(minScale, minScale, minScale);

    
    addInteractivity(geometry, positions, colors, outerColors);
  }

  /** Mouse event code **/
  function addInteractivity(geometry, positions, colors, outerColors) {
    const mouse = new THREE.Vector2(-Infinity, -Infinity);
    const raycaster = new THREE.Raycaster();
    raycaster.far = 4;
    raycaster.params.Points.threshold = 0.15;

    const hoverOffset = 0.5;
    const originalPositions = new Float32Array(positions.length);
    const originalColors = new Float32Array(positions.length);
    originalColors.set(colors);
    originalPositions.set(positions);

    const raisedPosition = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i += 3) {
      const start = new THREE.Vector3(
        positions[i], positions[i + 1], positions[i + 2]
      );
      const direction = start.clone().normalize();
      const target = start.clone().addScaledVector(direction, hoverOffset);
      raisedPosition[i] = target.x;
      raisedPosition[i + 1] = target.y;
      raisedPosition[i + 2] = target.z;
    }

    const hoverAnimations = new Map();
    let currIntersects = new Set();

    const tempVec3 = new THREE.Vector3();
    const tempColorOrig = new THREE.Color();
    const tempColorTarg = new THREE.Color();
    const tempCurrColor = new THREE.Color();

    function trackMouse() {
      const intersects = raycaster.intersectObject(pyramidPoints);
      if (intersects.length > 0) {
        currIntersects = new Set(
          intersects
            .map((i) => i.index)
            .filter((idx) => idx !== undefined)
        );
        intersects.forEach((intersection) => {
          const intersectedIndex = intersection.index;
          
          if (hoverAnimations.has(intersectedIndex)) {
            if (hoverAnimations.get(intersectedIndex).direction === "down") {
              hoverAnimations.get(intersectedIndex).direction = "up";
            }
          } else {
            
            const start = new THREE.Vector3(
              positions[intersectedIndex * 3],
              positions[intersectedIndex * 3 + 1],
              positions[intersectedIndex * 3 + 2]
            );
            const target = new THREE.Vector3(
              raisedPosition[intersectedIndex * 3],
              raisedPosition[intersectedIndex * 3 + 1],
              raisedPosition[intersectedIndex * 3 + 2]
            );
            hoverAnimations.set(intersectedIndex, {
              start,
              target,
              progress: 0,
              direction: "up",
            });
          }
        });
      } else {
        currIntersects.clear();
      }
    }

    function animateHover() {
      let positionNeedsUpdate = false;
      let colorNeedsUpdate = false;

      hoverAnimations.forEach((data, index) => {
        data.progress = MathUtils.clamp(
          data.progress + (data.direction === "up" ? 0.01 : -0.01),
          0,
          1
        );
        // Interpolate position
        tempVec3.lerpVectors(data.start, data.target, data.progress);

        positions[index * 3] = tempVec3.x;
        positions[index * 3 + 1] = tempVec3.y;
        positions[index * 3 + 2] = tempVec3.z;

        // Interpolate color
        tempColorOrig.setRGB(
          originalColors[index * 3],
          originalColors[index * 3 + 1],
          originalColors[index * 3 + 2]
        );
        tempColorTarg.setRGB(
          outerColors[index * 3],
          outerColors[index * 3 + 1],
          outerColors[index * 3 + 2]
        );
        tempCurrColor.copy(tempColorOrig).lerp(tempColorTarg, data.progress);

        colors[index * 3] = tempCurrColor.r;
        colors[index * 3 + 1] = tempCurrColor.g;
        colors[index * 3 + 2] = tempCurrColor.b;

        if (data.progress > 0 && data.progress < 1) {
          positionNeedsUpdate = true;
          colorNeedsUpdate = true;
        }

        if (data.progress === 1 && data.direction === "up") {
          if (!currIntersects.has(index)) {
            data.direction = "down";
          }
        } else if (data.progress === 0 && data.direction === "down") {
          hoverAnimations.delete(index);
        }
      });

      if (positionNeedsUpdate) {
        geometry.attributes.position.needsUpdate = true;
      }
      if (colorNeedsUpdate) {
        geometry.attributes.color.needsUpdate = true;
      }
    }

    // Mouse events
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = new THREE.Quaternion();
    const dampingFactor = 0.85;
    const minRotationSpeed = 0.005;
    const movementThreshold = 2;
    let hasSignificantMovement = false;
    let lastRotationAxis = new THREE.Vector3(0, 0, 0);
    let lastRotationAngle = 0;

    const domElement = canvasRef.current;

    domElement.addEventListener("mousedown", (event) => {
      isDragging = true;
      previousMousePosition.x = event.clientX;
      previousMousePosition.y = event.clientY;
      rotationVelocity.identity();
      hasSignificantMovement = false;
    });

    domElement.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      if (isDragging) {
        const deltaMove = {
          x: clientX - previousMousePosition.x,
          y: clientY - previousMousePosition.y,
        };

        if (
          Math.abs(deltaMove.x) > movementThreshold ||
          Math.abs(deltaMove.y) > movementThreshold
        ) {
          hasSignificantMovement = true;
        }

        const axis = new THREE.Vector3(deltaMove.y, deltaMove.x, 0).normalize();
        const angle =
          Math.sqrt(deltaMove.x ** 2 + deltaMove.y ** 2) * normalRotationSpeed;

        lastRotationAxis.copy(axis);
        lastRotationAngle = angle;

        // Apply rotation
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(axis, angle);
        pyramidPoints.quaternion.multiplyQuaternions(
          quaternion,
          pyramidPoints.quaternion
        );
        rotationVelocity.copy(quaternion);

        previousMousePosition.x = clientX;
        previousMousePosition.y = clientY;
      }
    });

    domElement.addEventListener("mouseup", () => {
      if (currIntersects.size > 0) {
        console.log("Clicked a hovered point, but ignoring manual grow—auto logic now controls scale.");
      }
      isDragging = false;

      if (!hasSignificantMovement) {
        rotationVelocity.identity();
        lastRotationAxis.set(0, 0, 0);
      }
    });

    domElement.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    
    function handleOrbScaling() {
      const scale = pyramidPoints.scale.x;

      if (isGrowing) {
        
        pyramidPoints.scale.multiplyScalar(1.015);
        canvasRef.current.style.pointerEvents = "none";
        if (pyramidPoints.scale.x > maxScale) {
          
          canvasRef.current.style.pointerEvents = "auto";
          pyramidPoints.scale.set(maxScale, maxScale, maxScale);
          isGrowing = false;
        }
      } else if (isShrinking) {
        
        canvasRef.current.style.pointerEvents = "none";
        pyramidPoints.scale.multiplyScalar(0.985);
        if (pyramidPoints.scale.x < minScale) {
        
          canvasRef.current.style.pointerEvents = "auto";
          pyramidPoints.scale.set(minScale, minScale, minScale);
          isShrinking = false;
        }
      }
    }


    function getDynamicRotationSpeed() {
      const scale = pyramidPoints.scale.x;

      const ratio = MathUtils.clamp(
        (scale - minScale) / (maxScale - minScale),
        0,
        1
      );

      return normalRotationSpeed + (slowRotationSpeed - normalRotationSpeed) * ratio;
    }

    function animateOrb() {
      // Hover logic
      trackMouse();
      
      animateHover();
      

      // Auto-scaling logic
      handleOrbScaling();

      // Rotational inertia
      if (!isDragging) {
        rotationVelocity.slerp(new THREE.Quaternion(), 1 - dampingFactor);
        const angle = rotationVelocity.angleTo(new THREE.Quaternion());

        
        const dynamicSpeed = getDynamicRotationSpeed();

        if (angle > minRotationSpeed) {
          pyramidPoints.quaternion.multiplyQuaternions(
            rotationVelocity,
            pyramidPoints.quaternion
          );
        } else if (angle !== 0 && lastRotationAxis.lengthSq() !== 0) {
          
          rotationVelocity.setFromAxisAngle(lastRotationAxis, dynamicSpeed);
          pyramidPoints.quaternion.multiplyQuaternions(
            rotationVelocity,
            pyramidPoints.quaternion
          );
        } else {
          rotationVelocity.identity();
        }
      }
    }

    _updateFunctions.push(animateOrb);
  }

  function animate() {
    requestAnimationFrame(animate);
    _updateFunctions.forEach((fn) => fn());
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,  // behind everything
        pointerEvents: "auto", 
      }}
    />
  );
}