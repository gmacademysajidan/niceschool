from PIL import Image, ImageDraw, ImageFont
import os

# Create 512x512 image RGBA
size = 512
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Background rounded rectangle
# Color: #047857 (RGB: 4, 120, 87)
accent_color = (4, 120, 87, 255)
radius = 110
draw.rounded_rectangle([0, 0, size, size], radius=radius, fill=accent_color)

# Draw bi-buildings icon (white)
white = (255, 255, 255, 255)

# Scale coordinates for 512x512
# Main building structures:
# Left building: x from 90 to 190, top at 210, bottom 410
# Center building: x from 190 to 320, top at 110, bottom 410
# Right building: x from 320 to 420, top at 160, bottom 410

# Left building:
draw.rectangle([90, 210, 190, 410], fill=white)

# Center building (taller):
draw.rectangle([190, 110, 320, 410], fill=white)

# Right building:
draw.rectangle([320, 160, 420, 410], fill=white)

# Roofs / angles
# Left roof slope:
draw.polygon([(70, 260), (90, 210), (190, 210), (190, 260)], fill=white)
# Center roof top:
draw.polygon([(170, 140), (190, 110), (320, 110), (340, 140)], fill=white)
# Right roof:
draw.polygon([(320, 160), (420, 160), (440, 210), (320, 210)], fill=white)

# Now punch windows cutouts (transparent or accent_color)
# Let's draw windows as accent_color boxes to carve windows into the building

# Left building windows (2 columns, 3 rows)
w_left = [
    (110, 240, 135, 275), (145, 240, 170, 275),
    (110, 295, 135, 330), (145, 295, 170, 330),
    (110, 350, 135, 385), (145, 350, 170, 385),
]
for rect in w_left:
    draw.rectangle(rect, fill=accent_color)

# Center building windows (2 columns, 4 rows)
w_center = [
    (215, 140, 245, 180), (265, 140, 295, 180),
    (215, 200, 245, 240), (265, 200, 295, 240),
    (215, 260, 245, 300), (265, 260, 295, 300),
    (215, 320, 245, 360), (265, 320, 295, 360),
]
for rect in w_center:
    draw.rectangle(rect, fill=accent_color)

# Right building windows (2 columns, 4 rows)
w_right = [
    (340, 185, 365, 220), (375, 185, 400, 220),
    (340, 240, 365, 275), (375, 240, 400, 275),
    (340, 295, 365, 330), (375, 295, 400, 330),
    (340, 350, 365, 385), (375, 350, 400, 385),
]
for rect in w_right:
    draw.rectangle(rect, fill=accent_color)

# Center building entrance door at bottom
draw.rectangle([235, 355, 275, 410], fill=accent_color)

out_path = os.path.join(os.path.dirname(__file__), '..', 'assets', 'img', 'favicon.webp')
img.save(out_path, 'WEBP', quality=100)
print('Successfully saved favicon.webp to', out_path)
